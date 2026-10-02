import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { useAuth } from '../context/AuthContext';
import { uploadImprovedVideoApi } from '../services/api';
import {
  Briefcase, CheckCircle2, Clock, Upload, ExternalLink, GitCompare, Cpu,
  Video, AlertTriangle, Star, TrendingUp, X
} from 'lucide-react';

export const EditorPortalPage: React.FC = () => {
  const { projects, updateProject, addToast, isDemoMode } = useDemo();
  const { user } = useAuth();

  // Show all projects that have an editorId (incoming requests)
  const myJobs = projects.filter((p) => p.editorId);
  const pendingJobs = myJobs.filter((p) => p.editorStatus === 'pending');
  const activeJobs = myJobs.filter((p) => ['accepted', 'in_review'].includes(p.editorStatus || ''));
  const completedJobs = myJobs.filter((p) => p.editorStatus === 'completed');

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending');

  const handleAccept = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return;
    updateProject({ ...proj, editorStatus: 'accepted' });
    addToast('Project accepted! Review the GENA audit and start editing.', 'success');
  };

  const handleSubmitRevision = async (projectId: string) => {
    setIsSubmitting(true);
    try {
      const res = await uploadImprovedVideoApi(projectId, uploadFile, isDemoMode);
      updateProject({ ...res.project, editorStatus: 'completed' });
      addToast('Revised video uploaded! GENA has re-analyzed the improvement.', 'success');
      setSelectedJobId(null);
      setUploadFile(null);
    } catch (err: any) {
      addToast(err.message || 'Upload failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedJobs = activeTab === 'pending' ? pendingJobs : activeTab === 'active' ? activeJobs : completedJobs;

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Editor Portal" />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-navy-500 to-brandOrange rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                <Cpu className="w-3.5 h-3.5 text-brandYellow" />
                <span>GENA AI PRE-ANALYSIS INCLUDED ON ALL PROJECTS</span>
              </div>
              <h2 className="text-xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h2>
              <p className="text-xs text-orange-100">Every client project below includes a full GENA content audit — you know exactly what needs fixing before you open the timeline.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-center">
                <span className="text-2xl font-black block">{myJobs.length}</span>
                <span className="text-[10px] font-semibold text-orange-100">Total Projects</span>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-center">
                <span className="text-2xl font-black block">{completedJobs.length}</span>
                <span className="text-[10px] font-semibold text-orange-100">Completed</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Pending Requests', count: pendingJobs.length, color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
              { label: 'Active Projects', count: activeJobs.length, color: 'text-brandBlue', bg: 'bg-blue-50', icon: Video },
              { label: 'Completed', count: completedJobs.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
              { label: 'Avg GENA Score Gain', count: '+15', color: 'text-brandOrange', bg: 'bg-orange-50', icon: TrendingUp },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block">{s.label}</span>
                    <span className={`text-2xl font-black block mt-1 ${s.color}`}>{s.count}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2">
            {[
              { key: 'pending', label: `Pending (${pendingJobs.length})` },
              { key: 'active', label: `Active (${activeJobs.length})` },
              { key: 'completed', label: `Completed (${completedJobs.length})` },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === tab.key ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          {displayedJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-navy-500 text-base">No {activeTab} projects</h3>
              <p className="text-xs text-gray-500">New project requests from creators will appear here with GENA audit reports attached.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedJobs.map((proj) => (
                <div key={proj.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card hover:shadow-cardHover transition-all">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                    {/* Left: Project Info */}
                    <div className="flex items-center gap-4">
                      <img src={proj.thumbnailUrl} alt={proj.title}
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-200 flex-shrink-0" />
                      <div className="space-y-1">
                        <h3 className="font-bold text-navy-500 text-base">{proj.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400">{proj.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs font-semibold text-navy-500">GENA Score: {proj.score}/100</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            proj.editorStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                            proj.editorStatus === 'accepted' ? 'bg-blue-100 text-blue-800' :
                            proj.editorStatus === 'in_review' ? 'bg-purple-100 text-purple-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {proj.editorStatus?.replace('_', ' ')}
                          </span>
                        </div>
                        {proj.editorNotes && (
                          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100 max-w-md">
                            <strong>Client notes:</strong> {proj.editorNotes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      <Link to={`/report/${proj.id}`}
                        className="px-3 py-2 rounded-xl bg-navy-50 text-navy-600 font-semibold text-xs hover:bg-navy-100 transition-colors flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-brandBlue" />
                        <span>View GENA Audit</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      {proj.editorStatus === 'pending' && (
                        <button onClick={() => handleAccept(proj.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept Project</span>
                        </button>
                      )}

                      {(proj.editorStatus === 'accepted' || proj.editorStatus === 'in_review') && (
                        <button onClick={() => setSelectedJobId(proj.id)}
                          className="px-4 py-2 rounded-xl bg-brandOrange hover:bg-orange-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Revised Video</span>
                        </button>
                      )}

                      {proj.status === 'improved' && (
                        <Link to={`/comparison/${proj.id}`}
                          className="px-3 py-2 rounded-xl bg-brandBlue-light text-brandBlue font-bold text-xs hover:bg-blue-100 transition-colors flex items-center gap-1.5">
                          <GitCompare className="w-3.5 h-3.5" />
                          <span>Before/After</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Upload Revised Video Modal */}
      {selectedJobId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative border border-gray-200">
            <button onClick={() => setSelectedJobId(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brandOrange uppercase mb-1">
                <Upload className="w-4 h-4" /> Upload Revised Edit
              </div>
              <h3 className="text-xl font-black text-navy-500">Submit Your Edit</h3>
              <p className="text-xs text-gray-500 mt-1">Upload the revised video. GENA will automatically re-analyze and generate the Before/After comparison for the creator.</p>
            </div>

            <div className="space-y-3">
              <input type="file" accept="video/mp4,video/quicktime,video/webm"
                onChange={(e) => e.target.files && setUploadFile(e.target.files[0])}
                className="block w-full text-xs text-gray-500 border border-gray-200 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-navy-50 file:text-navy-600 hover:file:bg-navy-100" />

              <div className="p-3 bg-brandBlue-light/40 rounded-xl text-xs text-navy-600 flex items-start gap-2">
                <Cpu className="w-4 h-4 text-brandBlue flex-shrink-0 mt-0.5" />
                <span>After upload, <strong>GENA AI</strong> will automatically re-audit the revised video and send the creator a Before vs After comparison report.</span>
              </div>
            </div>

            <button onClick={() => handleSubmitRevision(selectedJobId)} disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-brandOrange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              {isSubmitting ? 'GENA Re-Analyzing...' : 'Submit Revised Video to Creator'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
