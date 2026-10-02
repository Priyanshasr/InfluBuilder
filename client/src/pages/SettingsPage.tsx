import React from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { Sparkles, Shield, Cpu, Database, Bell, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { isDemoMode, setIsDemoMode, geminiConfigured } = useDemo();

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Platform Settings" />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Gemini API Status Box */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brandBlue to-brandOrange text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy-500 text-base">Google Gemini API Configuration</h3>
                  <p className="text-xs text-gray-500">Core intelligence layer status for video analysis</p>
                </div>
              </div>

              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                geminiConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {geminiConfigured ? 'GEMINI_API_KEY CONFIGURED' : 'DEMO MODE ACTIVE'}
              </div>
            </div>

            <div className="p-4 bg-bgLight rounded-2xl border border-gray-200 text-xs text-navy-500 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Active Model:</span>
                <span className="text-brandBlue font-mono">gemini-2.5-flash (Multimodal Video)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Environment Key Variable:</span>
                <span className="font-mono text-gray-600">GEMINI_API_KEY</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-500 block">Toggle Demo Mode</span>
                <span className="text-[11px] text-gray-500">Force use of sample analysis JSON for fast presentation demo</span>
              </div>
              <button
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isDemoMode ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isDemoMode ? 'Demo Mode Active' : 'Real Gemini Mode'}
              </button>
            </div>
          </div>

          {/* AI Preferences */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
            <h3 className="font-bold text-navy-500 text-base">AI Audit Preferences</h3>
            
            <div className="space-y-3 text-xs text-navy-500">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-brandBlue" />
                <span>Strict timestamp precision for hook and pacing checks</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-brandBlue" />
                <span>Include audio acoustic frequency balance evaluation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-brandBlue" />
                <span>Generate priority fixes with step-by-step editor guidance</span>
              </label>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
