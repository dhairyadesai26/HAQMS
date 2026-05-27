const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ─── Clean up existing data ──────────────────────────────────────────────────
  await prisma.queueToken.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  // ─── Hash password (password123 for all accounts) ────────────────────────────
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  // ─── Seed Users ──────────────────────────────────────────────────────────────
  console.log('👤 Seeding users...');

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@haqms.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  });

  const receptionistUser = await prisma.user.create({
    data: {
      email: 'reception1@haqms.com',
      password: hashedPassword,
      name: 'Sarah Johnson',
      role: 'RECEPTIONIST',
    },
  });

  const doctorUser = await prisma.user.create({
    data: {
      email: 'doctor1@haqms.com',
      password: hashedPassword,
      name: 'Dr. Emily Carter',
      role: 'DOCTOR',
    },
  });

  console.log(`  ✅ Created users: ${adminUser.email}, ${receptionistUser.email}, ${doctorUser.email}`);

  // ─── Seed Doctors ─────────────────────────────────────────────────────────────
  console.log('🩺 Seeding doctors...');

  const doctor1 = await prisma.doctor.create({
    data: {
      userId: doctorUser.id,  // Link Dr. Emily Carter to the doctor1@haqms.com user account
      name: 'Dr. Emily Carter',
      specialization: 'Cardiology',
      department: 'Cardiology',
      experience: 12,
      consultationFee: 800,
      availableFrom: '09:00',
      availableTo: '17:00',
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. James Mitchell',
      specialization: 'Orthopedics',
      department: 'Surgery',
      experience: 15,
      consultationFee: 1200,
      availableFrom: '08:00',
      availableTo: '16:00',
    },
  });

  const doctor3 = await prisma.doctor.create({
    data: {
      name: 'Dr. Priya Sharma',
      specialization: 'Neurology',
      department: 'Neurology',
      experience: 10,
      consultationFee: 1000,
      availableFrom: '10:00',
      availableTo: '18:00',
    },
  });

  const doctor4 = await prisma.doctor.create({
    data: {
      name: 'Dr. Robert Chen',
      specialization: 'General Medicine',
      department: 'General',
      experience: 8,
      consultationFee: 500,
      availableFrom: '09:00',
      availableTo: '17:00',
    },
  });

  const doctor5 = await prisma.doctor.create({
    data: {
      name: 'Dr. Aisha Patel',
      specialization: 'Dermatology',
      department: 'Dermatology',
      experience: 6,
      consultationFee: 700,
      availableFrom: '09:00',
      availableTo: '15:00',
    },
  });

  const doctor6 = await prisma.doctor.create({
    data: {
      name: 'Dr. Michael Torres',
      specialization: 'Pediatrics',
      department: 'Surgery',
      experience: 11,
      consultationFee: 900,
      availableFrom: '08:30',
      availableTo: '16:30',
    },
  });

  console.log(`  ✅ Created ${6} doctors`);

  // ─── Seed Patients ───────────────────────────────────────────────────────────
  console.log('🏥 Seeding patients...');

  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phoneNumber: '9876543210',
        age: 45,
        gender: 'MALE',
        medicalHistory: 'Hypertension diagnosed in 2018. On Amlodipine 5mg daily. Regular follow-ups every 3 months. No known allergies. Previous hospitalization for chest pain in 2020 - cleared after tests.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Mary Williams',
        email: 'mary.williams@email.com',
        phoneNumber: '9123456789',
        age: 38,
        gender: 'FEMALE',
        medicalHistory: 'Type 2 Diabetes - controlled with Metformin 500mg twice daily. HbA1c last checked at 6.8% (Jan 2024). Mild obesity (BMI 28). Annual eye and foot examinations scheduled.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Clark Kent',
        email: 'clark.kent@dailyplanet.com',
        phoneNumber: '9000000001',
        age: 32,
        gender: 'MALE',
        medicalHistory: null, // Intentional null - causes React crash bug
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Bruce Wayne',
        email: 'bruce@wayneenterprises.com',
        phoneNumber: '9000000002',
        age: 40,
        gender: 'MALE',
        medicalHistory: null, // Intentional null - causes React crash bug
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Diana Prince',
        email: 'diana.prince@themyscira.com',
        phoneNumber: '9111222333',
        age: 29,
        gender: 'FEMALE',
        medicalHistory: 'No significant medical history. Excellent physical fitness. Annual health checkup completed. Blood group: O+. No allergies reported.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Peter Parker',
        email: 'peter.parker@dailybugle.com',
        phoneNumber: '9444555666',
        age: 24,
        gender: 'MALE',
        medicalHistory: 'Mild asthma - uses Salbutamol inhaler as needed. No recent episodes. Seasonal allergies to pollen. Last respiratory assessment: Normal lung function.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Tony Stark',
        email: 'tony@starkindustries.com',
        phoneNumber: '9777888999',
        age: 50,
        gender: 'MALE',
        medicalHistory: 'Cardiac device implant monitoring required. Mild anxiety - on low-dose Alprazolam PRN. Annual cardiac scan scheduled. Previous arc reactor removal (2014). Blood pressure: Borderline high.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Natasha Romanoff',
        email: 'natasha.romanoff@shield.gov',
        phoneNumber: '9222333444',
        age: 35,
        gender: 'FEMALE',
        medicalHistory: 'Excellent health. Advanced physical conditioning. Scar tissue on right shoulder from old injury. No current medications. Classified additional medical records on file.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Steve Rogers',
        email: 'steve.rogers@avengers.com',
        phoneNumber: '9555666777',
        age: 102,
        gender: 'MALE',
        medicalHistory: 'Enhanced physiology - standard tests may yield atypical results. No active medications. Exceptional healing ability documented. Periodic blood panel for research purposes.',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Wanda Maximoff',
        email: 'wanda@avengers.com',
        phoneNumber: '9888111222',
        age: 28,
        gender: 'FEMALE',
        medicalHistory: 'Mild insomnia - managed with sleep hygiene, no medications. Occasional migraines - Sumatriptan prescribed as needed. Under psychological evaluation. No physical conditions of note.',
      },
    }),
  ]);

  console.log(`  ✅ Created ${patients.length} patients`);

  // ─── Seed Appointments ───────────────────────────────────────────────────────
  console.log('📅 Seeding appointments...');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const appt1 = await prisma.appointment.create({
    data: {
      patientId: patients[0].id, // John Smith
      doctorId: doctor1.id,       // Dr. Emily Carter
      appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      reason: 'Routine cardiac checkup and BP monitoring',
      status: 'CONFIRMED',
    },
  });

  const appt2 = await prisma.appointment.create({
    data: {
      patientId: patients[1].id, // Mary Williams
      doctorId: doctor4.id,       // Dr. Robert Chen
      appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
      reason: 'Diabetes follow-up and HbA1c review',
      status: 'CONFIRMED',
    },
  });

  const appt3 = await prisma.appointment.create({
    data: {
      patientId: patients[2].id, // Clark Kent
      doctorId: doctor4.id,
      appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      reason: 'General health checkup',
      status: 'PENDING',
    },
  });

  const appt4 = await prisma.appointment.create({
    data: {
      patientId: patients[6].id, // Tony Stark
      doctorId: doctor1.id,
      appointmentDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
      reason: 'Cardiac device follow-up scan',
      status: 'PENDING',
    },
  });

  const appt5 = await prisma.appointment.create({
    data: {
      patientId: patients[3].id, // Bruce Wayne
      doctorId: doctor3.id,       // Dr. Priya Sharma - Neurology
      appointmentDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 10, 0),
      reason: 'Persistent headaches evaluation',
      status: 'COMPLETED',
    },
  });

  const appt6 = await prisma.appointment.create({
    data: {
      patientId: patients[5].id, // Peter Parker
      doctorId: doctor4.id,
      appointmentDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 15, 0),
      reason: 'Asthma review and inhaler prescription renewal',
      status: 'COMPLETED',
    },
  });

  const appt7 = await prisma.appointment.create({
    data: {
      patientId: patients[4].id, // Diana Prince
      doctorId: doctor5.id,       // Dr. Aisha Patel - Dermatology
      appointmentDate: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 10, 0),
      reason: 'Skin rash consultation',
      status: 'PENDING',
    },
  });

  const appt8 = await prisma.appointment.create({
    data: {
      patientId: patients[9].id, // Wanda Maximoff
      doctorId: doctor3.id,
      appointmentDate: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 14, 0),
      reason: 'Migraine management consultation',
      status: 'PENDING',
    },
  });

  console.log(`  ✅ Created 8 appointments`);

  // ─── Seed Queue Tokens ───────────────────────────────────────────────────────
  console.log('🎫 Seeding queue tokens...');

  await prisma.queueToken.create({
    data: {
      tokenNumber: 1,
      patientId: patients[0].id,
      doctorId: doctor1.id,
      appointmentId: appt1.id,
      status: 'CALLING',
    },
  });

  await prisma.queueToken.create({
    data: {
      tokenNumber: 2,
      patientId: patients[6].id, // Tony Stark
      doctorId: doctor1.id,
      status: 'WAITING',
    },
  });

  await prisma.queueToken.create({
    data: {
      tokenNumber: 3,
      patientId: patients[8].id, // Steve Rogers
      doctorId: doctor1.id,
      status: 'WAITING',
    },
  });

  await prisma.queueToken.create({
    data: {
      tokenNumber: 1,
      patientId: patients[1].id, // Mary Williams
      doctorId: doctor4.id,
      appointmentId: appt2.id,
      status: 'COMPLETED',
    },
  });

  await prisma.queueToken.create({
    data: {
      tokenNumber: 2,
      patientId: patients[2].id, // Clark Kent
      doctorId: doctor4.id,
      appointmentId: appt3.id,
      status: 'WAITING',
    },
  });

  console.log(`  ✅ Created 5 queue tokens`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Pre-seeded Login Accounts (password: password123):');
  console.log('  👑 Admin:        admin@haqms.com');
  console.log('  🏥 Receptionist: reception1@haqms.com');
  console.log('  🩺 Doctor:       doctor1@haqms.com');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
