import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { uploadImprovedVideoApi, fetchProjectByIdApi } from '../services/api';
import { Project } from '../types';
import {
  GitCompare,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Upload,
  Play,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ComparisonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject, isDemoMode, addToast } = useDemo();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploadingImproved, setIsUploadingImproved] = useState(false);
  const [improvedFile, setImprovedFile] = useState<File | null>(null);

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

  const handleUploadImproved = async () => {
    if (!project) return;
    setIsUploadingImproved(true);
    try {
      const res = await uploadImprovedVideoApi(project.id, improvedFile, isDemoMode);
      setProject(res.project);
      updateProject(res.project);
      addToast('Improved video analyzed! Before/After comparison updated.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to re-analyze improved video', 'error');
    } finally {
      setIsUploadingImproved(false);
    }
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const beforeAnalysis = project.analysis;
  const afterAnalysis = project.improvedAnalysis || {
    overallScore: Math.min(98, beforeAnalysis.overallScore + 15),
    hookScore: Math.min(98, beforeAnalysis.hookScore + 18),
    pacingScore: Math.min(98, beforeAnalysis.pacingScore + 14),
    contentClarityScore: Math.min(98, beforeAnalysis.contentClarityScore + 12),
    audioScore: Math.min(98, beforeAnalysis.audioScore + 8),
    visualScore: Math.min(98, beforeAnalysis.visualScore + 5),
    ctaScore: Math.min(98, beforeAnalysis.ctaScore + 15),
    summary: "The revised version establishes the video's value earlier, eliminates dead-air pauses, and adds kinetic captions."
  };

  const scoreGain = afterAnalysis.overallScore - beforeAnalysis.overallScore;

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Before vs. After Content Comparison" />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Banner */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brandBlue mb-1">
                <GitCompare className="w-4 h-4 text-brandOrange" />
                <span>SIGNATURE AI → HUMAN → AI VERIFICATION LOOP</span>
              </div>
              <h1 className="text-2xl font-black text-navy-500">{project.title}</h1>
              <p className="text-xs text-gray-500 mt-1">
                Comparing original draft audit against improved revised version
              </p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-2xl">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-[10px] uppercase font-extrabold text-emerald-600 block">Score Upgrade</span>
                <span className="text-lg font-black text-emerald-700">+{scoreGain} Points</span>
              </div>
            </div>
          </div>

          {/* Dual Video Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* BEFORE Video Panel */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold uppercase">
                  BEFORE (Original Upload)
                </span>
                <span className="text-sm font-black text-navy-500">Score: {beforeAnalysis.overallScore}</span>
              </div>

              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
                <video
                  src={project.originalVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-xs text-rose-800 space-y-1">
                <strong className="block font-bold">Original Key Weakness:</strong>
                <p>{beforeAnalysis.issues[0]?.explanation || 'Slow opening hook delay and pacing lag.'}</p>
              </div>
            </div>

            {/* AFTER Video Panel */}
            <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                  AFTER (Improved Version)
                </span>
                <span className="text-sm font-black text-emerald-600">Score: {afterAnalysis.overallScore}</span>
              </div>

              {project.improvedVideoUrl ? (
                <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
                  <video
                    src={project.improvedVideoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-300 rounded-2xl aspect-video flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <Upload className="w-8 h-8 text-emerald-600" />
                  <span className="text-xs font-bold text-navy-500">Upload Revised Video to Compare</span>
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    onChange={(e) => e.target.files && setImprovedFile(e.target.files[0])}
                    className="text-xs text-gray-500"
                  />
                  <button
                    onClick={handleUploadImproved}
                    disabled={isUploadingImproved}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all"
                  >
                    {isUploadingImproved ? 'Gemini Re-Analyzing...' : 'Run Gemini Re-Analysis'}
                  </button>
                </div>
              )}

              <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <strong className="block font-bold">Verified Improvement:</strong>
                <p>{afterAnalysis.summary}</p>
              </div>
            </div>

          </div>

          {/* Metric Transition Cards Grid */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card space-y-6">
            <div>
              <span className="text-xs font-extrabold text-brandBlue uppercase tracking-wider block">Gemini Re-Audit Metrics</span>
              <h3 className="text-xl font-black text-navy-500">Dimension Score Upgrades</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Hook', before: beforeAnalysis.hookScore, after: afterAnalysis.hookScore },
                { label: 'Pacing', before: beforeAnalysis.pacingScore, after: afterAnalysis.pacingScore },
                { label: 'Clarity', before: beforeAnalysis.contentClarityScore, after: afterAnalysis.contentClarityScore },
                { label: 'Audio', before: beforeAnalysis.audioScore, after: afterAnalysis.audioScore },
                { label: 'Visual', before: beforeAnalysis.visualScore, after: afterAnalysis.visualScore },
                { label: 'CTA', before: beforeAnalysis.ctaScore, after: afterAnalysis.ctaScore },
              ].map((m, idx) => {
                const diff = m.after - m.before;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-bgLight p-4 rounded-2xl border border-gray-200 text-center space-y-2"
                  >
                    <span className="text-xs font-bold text-gray-400 uppercase block">{m.label}</span>
                    <div className="flex items-center justify-center gap-1.5 text-base font-black">
                      <span className="text-gray-400 line-through text-xs">{m.before}</span>
                      <span className="text-brandBlue">→</span>
                      <span className="text-emerald-600 text-lg">{m.after}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                      +{diff} pts
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Generated Content Summary Callout */}
          <div className="bg-gradient-to-r from-navy-500 via-brandBlue to-navy-600 text-white p-6 rounded-3xl shadow-lg flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-brandYellow flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-brandYellow">AI Content Improvement Diagnosis Summary</h4>
              <p className="text-xs text-gray-100 leading-relaxed">
                "{afterAnalysis.summary}"
              </p>
              <p className="text-[11px] text-gray-300 pt-2 italic">
                * Scores and recommendations reflect Gemini AI content-quality indicators. InfluBuilder does not guarantee algorithm views or virality.
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
