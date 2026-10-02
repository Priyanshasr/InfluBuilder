import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { analyzeVideoApi } from '../services/api';
import {
  Upload,
  Video,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Loader2,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  "Uploading video to secure processing pipeline",
  "Extracting visual & audio frame characteristics",
  "Gemini understanding multimodal video context",
  "Analyzing opening hook retention (0-5 seconds)",
  "Evaluating pacing rhythm & dead-air pauses",
  "Checking audio clarity & microphone acoustics",
  "Generating actionable priority recommendations",
  "Building your complete AI Content Audit Plan"
];

export const AnalyzePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [category, setCategory] = useState('Short-Form Reel');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isDemoMode, addProject, addToast } = useDemo();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 100 * 1024 * 1024) {
        setErrorMsg('File size exceeds maximum 100MB limit.');
        return;
      }
      setErrorMsg(null);
      setSelectedFile(file);
      if (!videoTitle) {
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!videoTitle) {
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setErrorMsg(null);

    // Cinematic step progression animation
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 900);

    try {
      const result = await analyzeVideoApi(selectedFile, videoTitle || 'Untitled Video Audit', category, isDemoMode);
      
      setTimeout(() => {
        clearInterval(stepInterval);
        addProject(result.project);
        addToast('Gemini Content Audit completed successfully!', 'success');
        navigate(`/report/${result.project.id}`);
      }, 7500);

    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Analysis failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Video Analysis Console" />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Explanation Banner */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brandBlue-light text-brandBlue flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-navy-500">Multimodal Gemini AI Content Audit</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Google Gemini will evaluate your video's visual quality, spoken clarity, pacing rhythm, audio acoustics, and hook strength to generate structured, actionable recommendations before you publish.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isAnalyzing ? (
              /* Video File Upload Dropzone Form */
              <motion.div
                key="upload-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card space-y-6"
              >
                {/* Drag & Drop Area */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    selectedFile
                      ? 'border-brandBlue bg-brandBlue-light/30'
                      : 'border-gray-300 hover:border-brandBlue hover:bg-gray-50'
                  }`}
                >
                  {selectedFile ? (
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-brandBlue text-white mx-auto flex items-center justify-center shadow-md">
                        <FileVideo className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="font-bold text-navy-500 text-sm block">{selectedFile.name}</span>
                        <span className="text-xs text-gray-400 font-mono">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'video/mp4'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-xs font-semibold text-rose-600 hover:underline"
                      >
                        Change file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-500 mx-auto flex items-center justify-center">
                        <Upload className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-500">
                          Drag and drop your draft video file here, or{' '}
                          <label className="text-brandBlue underline cursor-pointer">
                            browse files
                            <input
                              type="file"
                              accept="video/mp4,video/quicktime,video/webm"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Supported Formats: MP4, MOV, WEBM • Maximum File Size: 100MB
                        </p>
                      </div>
                      {isDemoMode && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                          <Info className="w-3.5 h-3.5 text-amber-600" />
                          <span>Demo Mode Active: Click analyze to run instant simulation if no file attached</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Project Title</label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="e.g. 5 Productivity Hacks Reel"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Content Format</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
                    >
                      <option value="Short-Form Reel">Short-Form Reel / TikTok / Shorts</option>
                      <option value="Educational">Educational Tutorial / Explainer</option>
                      <option value="Product Promo">Product Promotion / Ad</option>
                      <option value="YouTube Longform">YouTube Longform</option>
                    </select>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  onClick={handleStartAnalysis}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-navy-500 via-brandBlue to-brandOrange text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-brandYellow" />
                  <span>Analyze with Google Gemini</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

              </motion.div>
            ) : (
              /* Cinematic Analysis Process Loader */
              <motion.div
                key="cinematic-loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-navy-500 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brandBlue to-brandOrange mx-auto flex items-center justify-center shadow-lg">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Gemini Video Audit In Progress</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Synthesizing video frame rate, speech audio spectrum, and narrative structure...
                  </p>
                </div>

                {/* Step Progress Checklist */}
                <div className="max-w-md mx-auto space-y-3 bg-navy-600/60 p-6 rounded-2xl border border-navy-400/30">
                  {LOADING_STEPS.map((stepText, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 text-xs transition-all ${
                          isCompleted
                            ? 'text-emerald-300 font-semibold'
                            : isCurrent
                            ? 'text-brandYellow font-bold scale-[1.02]'
                            : 'text-gray-400 opacity-60'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 text-brandYellow animate-spin" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                          )}
                        </div>
                        <span>{stepText}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-navy-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brandBlue via-brandOrange to-brandYellow h-full transition-all duration-500"
                    style={{ width: `${((currentStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
};
