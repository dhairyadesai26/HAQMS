const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/reports/doctor-stats
// Highly inefficient nested loop aggregate reporting for admin/receptionists dashboard
// PERFORMANCE BUG: Performs multiple nested DB queries inside a loop for every doctor.
// Runs sequentially, blocking/scaling terrible with doctors count.
router.get('/doctor-stats', authenticate, async (req, res) => {
  try {
    const start = Date.now();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Fetch all data concurrently in bulk using grouping
    const [doctors, apptGroups, queueGroups] = await Promise.all([
      prisma.doctor.findMany(),
      prisma.appointment.groupBy({
        by: ['doctorId', 'status'],
        _count: { id: true },
      }),
      prisma.queueToken.groupBy({
        by: ['doctorId'],
        where: { createdAt: { gte: today } },
        _count: { id: true },
      }),
    ]);

    // 2. Map the bulk data to the report structure in memory (no more DB queries inside a loop!)
    const reportData = doctors.map(doc => {
      // Find all appointment groups for this doctor
      const docAppts = apptGroups.filter(a => a.doctorId === doc.id);

      const totalAppointments = docAppts.reduce((sum, a) => sum + a._count.id, 0);
      const completedAppointments = docAppts.find(a => a.status === 'COMPLETED')?._count.id || 0;
      const cancelledAppointments = docAppts.find(a => a.status === 'CANCELLED')?._count.id || 0;
      const queueTokensCount = queueGroups.find(q => q.doctorId === doc.id)?._count.id || 0;

      const revenue = completedAppointments * doc.consultationFee;

      return {
        id: doc.id,
        name: doc.name,
        specialization: doc.specialization,
        department: doc.department,
        totalAppointments,
        completedAppointments,
        cancelledAppointments,
        todayQueueSize: queueTokensCount,
        revenue,
      };
    });


    const durationMs = Date.now() - start;

    res.json({
      success: true,
      timeTakenMs: durationMs,
      data: reportData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report', details: error.message });
  }
});

module.exports = router;
