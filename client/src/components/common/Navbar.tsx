import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Video, User, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDemoMode, setIsDemoMode, geminiConfigured } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-500 via-brandBlue to-brandOrange flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-navy-500 font-sans">INFLUBUILDER</span>
              <span className="block text-[10px] font-semibold tracking-wider text-brandBlue uppercase -mt-1">AI Content Audit</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy-500">
            <Link to="/#how-it-works" className="hover:text-brandBlue transition-colors">How It Works</Link>
            <Link to="/#gemini-ai" className="hover:text-brandBlue transition-colors flex items-center gap-1.5">
              <span>Gemini AI</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-brandBlue-light text-brandBlue rounded-full">Core</span>
            </Link>
            <Link to="/editor-marketplace" className="hover:text-brandBlue transition-colors">Editor Marketplace</Link>
            <Link to="/projects" className="hover:text-brandBlue transition-colors">Sample Audits</Link>
          </div>

          {/* Actions & Badges */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Demo Mode Toggle Badge */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isDemoMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title={geminiConfigured ? "Toggle between Real Gemini API and Demo analysis mode" : "Gemini Key missing - Demo Mode Active"}
            >
              <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span>{isDemoMode ? 'DEMO MODE' : 'REAL GEMINI API'}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/analyze"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-500 text-white font-semibold text-sm hover:bg-navy-600 transition-all shadow-md"
                >
                  <Video className="w-4 h-4 text-brandYellow" />
                  <span>Analyze Video</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-500 text-sm font-semibold transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-navy-500 hover:bg-gray-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/analyze"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-navy-500 to-brandBlue text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <span>Analyze My Video</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-amber-50 text-amber-800 border-amber-300"
            >
              {isDemoMode ? 'DEMO' : 'LIVE'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/editor-marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-navy-500 font-medium hover:bg-gray-50"
          >
            Editor Marketplace
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-navy-500 font-medium hover:bg-gray-50"
          >
            My Projects
          </Link>
          <Link
            to="/analyze"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center px-4 py-3 rounded-xl bg-navy-500 text-white font-semibold text-sm"
          >
            Analyze My Video
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
                navigate('/');
              }}
              className="block w-full text-left px-3 py-2 text-rose-600 font-medium"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-2 rounded-xl border border-gray-300 text-navy-500 font-semibold"
            >
              Log In / Try Demo
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
