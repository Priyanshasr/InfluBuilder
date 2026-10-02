import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import {
  Video,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  GitCompare,
  Plus
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { projects } = useDemo();

  const analyzedCount = projects.length;
  const avgScore = Math.round(
    projects.reduce((acc, p) => acc + (p.improvedAnalysis?.overallScore || p.score), 0) / (projects.length || 1)
  );
  const improvementsCount = projects.filter((p) => p.status === 'improved').length;

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Creator Dashboard" />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Latest AI Insight Callout */}
          <div className="bg-gradient-to-r from-navy-500 via-brandBlue to-navy-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandYellow/20 text-brandYellow text-xs font-bold border border-brandYellow/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LATEST GEMINI INSIGHT</span>
              </div>
              <h2 className="text-xl font-bold">"Your biggest improvement opportunity is the first 5 seconds of your video."</h2>
              <p className="text-xs text-gray-200">
                Gemini detected an average 4.2-second delay across recent drafts before main value statements.
              </p>
            </div>
            <Link
              to="/analyze"
              className="z-10 px-5 py-3 rounded-xl bg-gradient-to-r from-brandOrange to-brandYellow text-navy-500 font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Audit New Video</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Videos Analyzed</span>
                <div className="text-2xl font-black text-navy-500 mt-1">{analyzedCount}</div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +4 this week
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Average Score</span>
                <div className="text-2xl font-black text-navy-500 mt-1">{avgScore}/100</div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +12 score gain
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Improvements Made</span>
                <div className="text-2xl font-black text-navy-500 mt-1">{improvementsCount}</div>
                <span className="text-[11px] text-brandBlue font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified by Gemini
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Active Projects</span>
                <div className="text-2xl font-black text-navy-500 mt-1">{projects.length}</div>
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> Updated today
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <GitCompare className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Recent Projects Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-500">Recent Content Audits</h3>
                <p className="text-xs text-gray-500">Overview of videos processed by Gemini analysis engine</p>
              </div>
              <Link to="/projects" className="text-xs font-bold text-brandBlue hover:underline flex items-center gap-1">
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-navy-500 font-bold text-xs uppercase border-b border-gray-100">
                  <tr>
                    <th className="p-4">Video Project</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Gemini Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.thumbnailUrl}
                            alt={proj.title}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                          <div>
                            <span className="font-bold text-navy-500 block">{proj.title}</span>
                            <span className="text-xs text-gray-400">{proj.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-navy-500">{proj.score}/100</span>
                          {proj.improvedAnalysis && (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              → {proj.improvedAnalysis.overallScore}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                            proj.status === 'improved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : proj.status === 'in_progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-brandBlue border border-blue-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            proj.status === 'improved' ? 'bg-emerald-500' : proj.status === 'in_progress' ? 'bg-amber-500' : 'bg-brandBlue'
                          }`} />
                          {proj.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          to={`/report/${proj.id}`}
                          className="px-3 py-1.5 rounded-lg bg-navy-50 text-navy-600 font-semibold text-xs hover:bg-navy-100 transition-colors inline-flex items-center gap-1"
                        >
                          <span>Report</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        {proj.status === 'improved' && (
                          <Link
                            to={`/comparison/${proj.id}`}
                            className="px-3 py-1.5 rounded-lg bg-brandBlue-light text-brandBlue font-semibold text-xs hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                          >
                            <GitCompare className="w-3 h-3" />
                            <span>Compare</span>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
