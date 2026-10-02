import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Users,
  GitCompare,
  Video,
  Layers,
  Clock,
  Volume2,
  Eye,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bgLight flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-white via-bgLight to-gray-50">
        {/* Subtle background glow elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brandBlue/10 via-brandOrange/5 to-brandYellow/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Hackathon Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-50 border border-navy-100 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-brandOrange animate-ping" />
              <span className="text-xs font-bold text-navy-500 uppercase tracking-wide">
                BUILT FOR GOOGLE GEMINI API HACKATHON — CORE AI: GENA
              </span>
              <Sparkles className="w-4 h-4 text-brandYellow" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-navy-500 tracking-tight leading-[1.1]"
            >
              Create Better Content <br className="hidden sm:inline" />
              <span className="gradient-text">Before You Publish.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Upload your video, let <strong className="text-navy-500 font-semibold">GENA AI</strong> identify what is holding it back, and turn AI insights into actionable content improvements.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                to="/analyze"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-navy-500 via-brandBlue to-navy-600 text-white font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <Video className="w-5 h-5 text-brandYellow" />
                <span>Analyze My Video</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-gray-200 text-navy-500 font-bold text-base hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>See How It Works</span>
              </a>
            </motion.div>

          </div>

          {/* Hero Realistic UI Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-200/80 relative"
          >
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-gray-400 ml-3">InfluBuilder — GENA AI Audit Console</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>GENA Multimodal Engine</span>
              </div>
            </div>

            {/* Content Mockup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Video Preview */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl overflow-hidden aspect-video relative group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
                  alt="Video Audit Preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                      Original Upload
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/80 text-[10px] font-bold text-white">
                      Weak Hook Detected
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                      <span className="text-xs font-medium">00:30 Reel Audit</span>
                    </div>
                    <span className="text-xs text-gray-300 font-mono">00:00 - 00:05</span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Analysis Cards */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Score Header */}
                <div className="flex items-center justify-between bg-navy-50 p-4 rounded-2xl border border-navy-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Overall Content Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-navy-500">78</span>
                      <span className="text-sm font-semibold text-gray-500">/ 100</span>
                      <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full ml-2">
                        Requires Hook & Pacing Polish
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-brandBlue border-t-brandOrange flex items-center justify-center text-xs font-bold text-navy-500">
                    78%
                  </div>
                </div>

                {/* Score Grid Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Hook</span>
                    <div className="text-lg font-bold text-amber-600">72</div>
                    <span className="text-[9px] text-gray-500">Slow 4s intro</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Pacing</span>
                    <div className="text-lg font-bold text-rose-600">68</div>
                    <span className="text-[9px] text-gray-500">Mid pause lag</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Audio</span>
                    <div className="text-lg font-bold text-emerald-600">76</div>
                    <span className="text-[9px] text-gray-500">Clear voiceover</span>
                  </div>
                </div>

                {/* Priority Fix Box */}
                <div className="bg-rose-50/70 border border-rose-200 p-3.5 rounded-xl text-left flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-rose-800">Priority Opportunity: Opening 5 Seconds</span>
                    <p className="text-xs text-rose-700 mt-0.5">
                      "GENA detected 4 seconds of ambient delay before vocal cue. Start directly with the core problem statement."
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 1. Problem Section */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brandBlue uppercase tracking-widest mb-2">The Problem</h2>
            <p className="text-3xl font-extrabold text-navy-500 sm:text-4xl">
              "Creating content is easy. Knowing why it isn't working is harder."
            </p>
            <p className="text-gray-600 mt-4 text-base">
              Most creators publish videos without knowing which hidden structural flaws trigger audience drop-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Weak Hooks",
                desc: "Taking 5–10 seconds to introduce the video concept causes early drop-off.",
                icon: Clock,
                color: "text-rose-500",
                bg: "bg-rose-50"
              },
              {
                title: "Poor Pacing",
                desc: "Unedited silent gaps and monotonous speech slow down visual rhythm.",
                icon: Layers,
                color: "text-amber-500",
                bg: "bg-amber-50"
              },
              {
                title: "Unclear Messaging",
                desc: "Failing to highlight the key takeaway makes content feel unfocused.",
                icon: Target,
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                title: "Audio Problems",
                desc: "Muffled microphones, loud music, or room echo reduce retention.",
                icon: Volume2,
                color: "text-purple-500",
                bg: "bg-purple-50"
              },
              {
                title: "Repetition & Filler",
                desc: "Redundant explanations inflate video duration without adding value.",
                icon: AlertTriangle,
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              {
                title: "Weak Call-to-Action",
                desc: "Ending abruptly without guiding viewers on what to do next.",
                icon: Eye,
                color: "text-emerald-500",
                bg: "bg-emerald-50"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-gray-200 bg-bgLight hover:shadow-cardHover transition-all">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-navy-500 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. How It Works (5 Steps) */}
      <section id="how-it-works" className="py-20 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brandBlue uppercase tracking-widest mb-2">5-Step Method</h2>
            <p className="text-3xl font-extrabold text-navy-500 sm:text-4xl">
              From Raw Draft to Actionable Content Perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { num: "01", step: "UPLOAD", title: "Upload Video", desc: "Drag & drop MP4, MOV, or WEBM draft clip." },
              { num: "02", step: "ANALYZE", title: "GENA Audit", desc: "GENA AI evaluates pacing, audio, and hook." },
              { num: "03", step: "UNDERSTAND", title: "AI Content Audit", desc: "Review detailed scores & timestamp fixes." },
              { num: "04", step: "IMPROVE", title: "DIY or Hire Editor", desc: "Apply fixes yourself or send to an editor." },
              { num: "05", step: "RE-CHECK", title: "Before vs After", desc: "Re-analyze improved video to confirm gains." },
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black text-brandBlue/30 block mb-2">{s.num}</span>
                  <span className="text-[10px] font-extrabold tracking-wider text-brandOrange uppercase block mb-1">{s.step}</span>
                  <h3 className="text-base font-bold text-navy-500 mb-2">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GENA Intelligence Showcase Section */}
      <section id="gena-ai" className="py-20 bg-navy-500 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/20 text-brandYellow text-xs font-bold border border-brandYellow/30">
                <Cpu className="w-4 h-4" />
                <span>GENA AI — POWERED BY GOOGLE GEMINI</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Not a Chatbot. <br />
                A Multimodal Content Engine.
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                InfluBuilder's <strong className="text-brandYellow">GENA AI</strong> (powered by Google Gemini) uses multimodal API capabilities to process visual frames, spoken audio transcripts, and clip structure simultaneously.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Multimodal Video Perception", desc: "Analyzes video, speech, and visual cadence together." },
                  { title: "Structured JSON Diagnostics", desc: "Returns schema-validated scores, timestamps, and priority fixes." },
                  { title: "Timestamp-Specific Feedback", desc: "Pinpoints exact seconds where pacing lags or intro hooks stall." },
                  { title: "Content Quality Indicators", desc: "Provides objective editorial feedback without claiming fake virality." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-brandBlue flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Code / Output Preview */}
            <div className="bg-navy-700 p-6 rounded-3xl border border-navy-600 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-600">
                <span className="text-xs font-mono text-brandYellow">gena.analyzeVideo() — Gemini Backend</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">200 OK</span>
              </div>
              <pre className="text-xs font-mono text-blue-200 bg-navy-800 p-4 rounded-xl overflow-x-auto leading-relaxed border border-navy-600">
{`{
  "overallScore": 78,
  "hookScore": 72,
  "pacingScore": 68,
  "audioScore": 76,
  "issues": [
    {
      "title": "Delayed Opening Hook",
      "severity": "high",
      "explanation": "First 4 seconds are silent."
    }
  ],
  "timestamps": [
    { "start": "00:00", "end": "00:04", "issue": "Silence" }
  ]
}`}
              </pre>
              <div className="text-xs text-gray-400 text-center italic">
                Real structured response rendered seamlessly in InfluBuilder UI
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. AI -> Human -> AI Loop */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brandBlue uppercase tracking-widest mb-2">Our Key Differentiator</h2>
            <p className="text-3xl font-extrabold text-navy-500 sm:text-4xl">
              The AI → Human → AI Ecosystem
            </p>
            <p className="text-gray-600 mt-4 text-base">
              AI diagnoses the content. Humans execute the edits. AI verifies the improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center relative">
            {[
              { title: "1. Creator Uploads", desc: "Upload raw draft video", icon: Video },
              { title: "2. GENA Diagnoses", desc: "AI audit flags weak sections", icon: Sparkles },
              { title: "3. Creator or Editor", desc: "Apply actionable fixes", icon: Users },
              { title: "4. GENA Verifies", desc: "Before vs After score upgrade", icon: GitCompare },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-bgLight p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brandBlue-light text-brandBlue mx-auto flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-500 text-base">{step.title}</h3>
                  <p className="text-xs text-gray-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Marketplace & Before/After Callout */}
      <section className="py-20 bg-gradient-to-b from-bgLight to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-brandOrange-light text-brandOrange text-xs font-bold uppercase">
                Editor Marketplace
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-navy-500">
                Need a professional touch? Hire verified video editors.
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Send GENA's exact audit report directly to specialist video editors on our marketplace. They know precisely what needs trimming and polishing.
              </p>
              <Link
                to="/editor-marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-500 text-white font-bold text-sm hover:bg-navy-600 transition-all shadow-md"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-bgLight p-6 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-500 uppercase">Before vs After Verification</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  +15 Score Gain
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-gray-200 text-center">
                  <span className="text-[10px] font-bold text-gray-400">ORIGINAL DRAFT</span>
                  <div className="text-2xl font-black text-rose-500">68</div>
                  <span className="text-[10px] text-gray-500">Slow hook, noise</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-300 text-center shadow-sm">
                  <span className="text-[10px] font-bold text-emerald-600">IMPROVED REVISION</span>
                  <div className="text-2xl font-black text-emerald-600">83</div>
                  <span className="text-[10px] text-gray-500">Fast hook, clean audio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Turn Every Upload Into a Better Version.
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto">
            Upload your video right now and let <strong className="text-brandYellow">GENA AI</strong> audit your content in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-navy-500 font-bold text-base shadow-md hover:shadow-xl transition-all">Sign In / Create Account</Link>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-brandOrange to-brandYellow text-navy-500 font-extrabold text-lg shadow-xl hover:scale-105 transition-all"
          >
            <Zap className="w-6 h-6 fill-navy-500" />
            <span>Analyze My Video Now</span>
          </Link></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
