import React from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useDemo } from '../context/DemoContext';
import { User, Video, Award, Sparkles, CheckCircle2, Mail, Shield } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useDemo();

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Creator Profile" />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-brandBlue/30 shadow-md"
            />
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-navy-500">{user?.name}</h1>
              <span className="text-xs font-bold text-brandBlue block">{user?.creatorType}</span>
              <p className="text-xs text-gray-600 max-w-md leading-relaxed">{user?.bio}</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                {user?.contentCategories.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-navy-50 text-navy-600 text-xs font-semibold">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card text-center">
              <span className="text-xs font-bold text-gray-400 uppercase">Videos Processed</span>
              <div className="text-3xl font-black text-navy-500 mt-1">{projects.length}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card text-center">
              <span className="text-xs font-bold text-gray-400 uppercase">Average Audit Score</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">81/100</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-card text-center">
              <span className="text-xs font-bold text-gray-400 uppercase">Verified Improvements</span>
              <div className="text-3xl font-black text-brandBlue mt-1">
                {projects.filter((p) => p.status === 'improved').length}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
