import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-500 text-white pt-16 pb-12 border-t border-navy-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-navy-600/60">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brandBlue to-brandOrange flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">INFLUBUILDER</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Don't just create content. Understand what makes it better.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-600/80 border border-brandBlue/30 text-xs font-medium text-blue-200">
              <Cpu className="w-4 h-4 text-brandYellow" />
              <span>Built for Google Gemini API Hackathon</span>
            </div>
          </div>

          {/* Core Platform */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/analyze" className="hover:text-brandBlue transition-colors">Analyze Video</Link></li>
              <li><Link to="/projects" className="hover:text-brandBlue transition-colors">My Projects</Link></li>
              <li><Link to="/editor-marketplace" className="hover:text-brandBlue transition-colors">Editor Marketplace</Link></li>
              <li><Link to="/dashboard" className="hover:text-brandBlue transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* Gemini AI Capabilities */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Gemini Intelligence</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-1.5"><span>Hook Strength Audit</span></li>
              <li className="flex items-center gap-1.5"><span>Pacing & Rhythm Analysis</span></li>
              <li className="flex items-center gap-1.5"><span>Audio & Clarity Check</span></li>
              <li className="flex items-center gap-1.5"><span>Before vs After Comparison</span></li>
            </ul>
          </div>

          {/* Hackathon Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Hackathon & Docs</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="https://ai.google.dev" target="_blank" rel="noreferrer" className="hover:text-brandBlue transition-colors inline-flex items-center gap-1">
                  <span>Google AI Dev Center</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a href="https://ai.google.dev/gemini-api" target="_blank" rel="noreferrer" className="hover:text-brandBlue transition-colors inline-flex items-center gap-1">
                  <span>Gemini API Docs</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} InfluBuilder. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            <strong className="text-gray-300">Important Positioning Note:</strong> Scores and recommendations are AI-generated content quality indicators intended to support video editing. InfluBuilder does not guarantee algorithm distribution, view counts, virality, or financial returns.
          </p>
        </div>
      </div>
    </footer>
  );
};
