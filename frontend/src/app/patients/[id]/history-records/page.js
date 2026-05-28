'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import { Activity, ArrowLeft, ClipboardList, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function PatientHistory() {
  const { token, API_BASE_URL, user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPatientData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/patients/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch patient history');
        }
        
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchPatientData();
    }
  }, [id, token, user, router, API_BASE_URL]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {loading ? (
          <div className="flex justify-center py-12">
            <Activity className="h-8 w-8 text-teal-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg">
            {error}
          </div>
        ) : patient ? (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <User className="h-6 w-6 text-teal-500" />
                {patient.name}
              </h1>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
                <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {patient.phoneNumber}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <ClipboardList className="h-6 w-6 text-teal-500" />
                Medical History
              </h2>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {patient.medicalHistory || 'No medical history on file.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-teal-500" />
                Past Appointments
              </h2>
              {patient.appointments && patient.appointments.length > 0 ? (
                <div className="space-y-3">
                  {patient.appointments.map(app => (
                    <div key={app.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {new Date(app.appointmentDate).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">{app.reason}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700' : 
                        app.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No previous appointments found.</p>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
