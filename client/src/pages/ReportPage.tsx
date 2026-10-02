import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { fetchProjectByIdApi } from '../services/api';
import { Project, PriorityFixItem } from '../types';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
  Users,
  Video,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useDemo();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFix, setSelectedFix] = useState<PriorityFixItem | null>(null);
  const [showFixModal, setShowFixModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const local = projects.find((p) => p.id === id);
    if (local) {
      setProject(local);
      setLoading(false);
    } else {
      fetchProjectByIdApi(id).then((p) => {
        setProject(p);
        setLoading(false);
      });
    }
  }, [id, projects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-brandBlue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-navy-500">Fetching Gemini AI Audit Report...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bgLight flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-rose-500" />
        <h2 className="text-xl font-bold text-navy-500">Report Not Found</h2>
        <Link to="/projects" className="px-5 py-2.5 bg-navy-500 text-white rounded-xl font-bold text-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const { analysis } = project;

  const chartData = [
    { subject: 'Hook', value: analysis.hookScore, fullMark: 100 },
    { subject: 'Clarity', value: analysis.contentClarityScore, fullMark: 100 },
    { subject: 'Pacing', value: analysis.pacingScore, fullMark: 100 },
    { subject: 'Visual', value: analysis.visualScore, fullMark: 100 },
    { subject: 'Audio', value: analysis.audioScore, fullMark: 100 },
    { subject: 'CTA', value: analysis.ctaScore, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Your Content Audit Report" />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Banner */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brandBlue mb-1">
                <Sparkles className="w-4 h-4 text-brandYellow" />
                <span>POWERED BY GOOGLE GEMINI API</span>
                {analysis.isDemo && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full border border-amber-300">
                    DEMO AUDIT
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-black text-navy-500">{project.title}</h1>
              <p className="text-xs text-gray-500 mt-1">
                Format: {project.category} • Processed {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/comparison/${project.id}`}
                className="px-4 py-2.5 rounded-xl bg-navy-50 text-navy-600 font-bold text-xs hover:bg-navy-100 transition-colors flex items-center gap-1.5"
              >
                <span>Before / After View</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Overall Score & Score Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Main Score Circular Ring Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-navy-500 to-navy-700 text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brandYellow mb-4">
                Overall Content Score
              </span>

              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="88" cy="88" r="76" stroke="#263A5F" strokeWidth="14" fill="transparent" />
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    stroke="#2F80D9"
                    strokeWidth="14"
                    strokeDasharray="477"
                    strokeDashoffset={477 - (477 * analysis.overallScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white">{analysis.overallScore}</span>
                  <span className="text-xs text-gray-300 font-semibold">/ 100</span>
                </div>
              </div>

              <p className="text-xs text-gray-200 mt-6 leading-relaxed px-2">
                "AI-generated content quality indicator based on visual, audio, pacing, and hook characteristics."
              </p>
            </div>

            {/* Individual Dimension Metric Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Hook Score', score: analysis.hookScore, note: 'Opening retention (0-5s)', color: 'text-amber-500' },
                { label: 'Content Clarity', score: analysis.contentClarityScore, note: 'Message structure', color: 'text-blue-500' },
                { label: 'Pacing Score', score: analysis.pacingScore, note: 'Clip rhythm & silence', color: 'text-purple-500' },
                { label: 'Visual Quality', score: analysis.visualScore, note: 'Lighting & framing', color: 'text-emerald-500' },
                { label: 'Audio Quality', score: analysis.audioScore, note: 'Microphone clarity', color: 'text-indigo-500' },
                { label: 'CTA Quality', score: analysis.ctaScore, note: 'Ending prompt clarity', color: 'text-rose-500' },
              ].map((m, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-card flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block">{m.label}</span>
                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{m.note}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className={`text-3xl font-black ${m.color}`}>{m.score}</span>
                    <span className="text-xs text-gray-400 font-semibold">/ 100</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Recharts Analytics Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-base font-bold text-navy-500 mb-1">Content Characteristics Radar</h3>
              <p className="text-xs text-gray-500 mb-4">Gemini multidimensional evaluation profile</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#263A5F', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Score" dataKey="value" stroke="#2F80D9" fill="#2F80D9" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-navy-500 mb-1">Dimension Distribution</h3>
              <p className="text-xs text-gray-500 mb-4">Comparative score breakdown across factors</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0' }} />
                    <Bar dataKey="value" fill="#20345D" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Executive Summary & Strengths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-navy-500 font-bold text-base border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 text-brandYellow" />
                <h3>Gemini Executive Summary</h3>
              </div>
              <p className="text-sm text-navy-500 leading-relaxed bg-navy-50/50 p-4 rounded-2xl border border-navy-100/60">
                "{analysis.summary}"
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-base border-b border-gray-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3>Identified Content Strengths</h3>
              </div>
              <ul className="space-y-2.5">
                {analysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Priority Fixes ("Fix These First") */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-brandOrange uppercase tracking-wider block">Priority Plan</span>
                <h3 className="text-xl font-black text-navy-500">Fix These First</h3>
              </div>
              <span className="text-xs font-semibold text-gray-400">
                {analysis.priorityFixes.length} Actionable Items
              </span>
            </div>

            <div className="space-y-4">
              {analysis.priorityFixes.map((fix, idx) => (
                <div
                  key={fix.id || idx}
                  className="p-5 rounded-2xl border border-gray-200 bg-bgLight flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-brandBlue">0{idx + 1}</span>
                      <h4 className="text-base font-bold text-navy-500">{fix.title}</h4>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          fix.severity === 'high'
                            ? 'bg-rose-100 text-rose-800'
                            : fix.severity === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {fix.severity} priority
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      <strong>Issue:</strong> {fix.issue}
                    </p>
                    <p className="text-xs text-navy-500 font-medium">
                      <strong>Recommendation:</strong> {fix.recommendation}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFix(fix);
                      setShowFixModal(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-navy-500 to-brandBlue text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Fix It</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamp Recommendations */}
          {analysis.timestamps && analysis.timestamps.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-navy-500 font-bold text-base border-b border-gray-100 pb-3">
                <Clock className="w-5 h-5 text-brandBlue" />
                <h3>Timestamp-Based Recommendations</h3>
              </div>
              <div className="space-y-3">
                {analysis.timestamps.map((ts, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-4">
                    <span className="px-2.5 py-1 rounded bg-navy-500 text-white font-mono text-xs font-bold flex-shrink-0">
                      {ts.start} - {ts.end}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-navy-500 block">{ts.issue}</span>
                      <span className="text-xs text-gray-600">{ts.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Fix It Choice Modal (DIY or Hire Editor) */}
      {showFixModal && selectedFix && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-gray-200">
            <button
              onClick={() => setShowFixModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-brandOrange uppercase">Actionable Fix Workflow</span>
              <h3 className="text-xl font-black text-navy-500 mt-1">{selectedFix.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{selectedFix.recommendation}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Option A: DIY */}
              <div className="p-5 rounded-2xl border-2 border-brandBlue/30 bg-brandBlue-light/30 space-y-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-brandBlue text-white flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-navy-500 text-sm">Option A: Do It Yourself</h4>
                <p className="text-xs text-gray-600">
                  Apply Gemini's recommendations in Premiere, CapCut, or Final Cut.
                </p>
                <button
                  onClick={() => {
                    setShowFixModal(false);
                    navigate(`/comparison/${project.id}`);
                  }}
                  className="w-full py-2 rounded-xl bg-brandBlue text-white text-xs font-bold shadow-sm"
                >
                  Upload Revised Video
                </button>
              </div>

              {/* Option B: Find Editor */}
              <div className="p-5 rounded-2xl border-2 border-brandOrange/30 bg-brandOrange-light/30 space-y-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-brandOrange text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-navy-500 text-sm">Option B: Hire an Editor</h4>
                <p className="text-xs text-gray-600">
                  Send this exact audit report to a specialist editor on our marketplace.
                </p>
                <button
                  onClick={() => {
                    setShowFixModal(false);
                    navigate('/editor-marketplace');
                  }}
                  className="w-full py-2 rounded-xl bg-brandOrange text-white text-xs font-bold shadow-sm"
                >
                  Find Specialist Editor
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
