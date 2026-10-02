import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Video, Menu, X, ArrowRight, Wrench, Cpu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDemoMode, setIsDemoMode, geminiConfigured } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isEditor = user?.role === 'editor';

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
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-brandBlue uppercase -mt-1">
                <Cpu className="w-3 h-3" /> Powered by GENA AI
              </span>
            </div>
          </Link>

          {/* Navigation Links - role-aware */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy-500">
            {!isEditor ? (
              <>
                <Link to="/#how-it-works" className="hover:text-brandBlue transition-colors">How It Works</Link>
                <Link to="/#gena-ai" className="hover:text-brandBlue transition-colors flex items-center gap-1.5">
                  <span>GENA AI</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-brandBlue-light text-brandBlue rounded-full">Core</span>
                </Link>
                <Link to="/editor-marketplace" className="hover:text-brandBlue transition-colors">Editor Marketplace</Link>
              </>
            ) : (
              <>
                <Link to="/editor-portal" className="hover:text-brandOrange transition-colors flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-brandOrange" />
                  <span>My Editor Portal</span>
                </Link>
                <Link to="/editor-marketplace" className="hover:text-brandBlue transition-colors">Marketplace</Link>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* GENA / Demo Mode Badge */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isDemoMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span>{isDemoMode ? 'GENA DEMO MODE' : 'GENA LIVE MODE'}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {!isEditor ? (
                  <Link to="/analyze"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-500 text-white font-semibold text-sm hover:bg-navy-600 transition-all shadow-md">
                    <Video className="w-4 h-4 text-brandYellow" />
                    <span>Analyze Video</span>
                  </Link>
                ) : (
                  <Link to="/editor-portal"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brandOrange text-white font-semibold text-sm hover:bg-orange-600 transition-all shadow-md">
                    <Wrench className="w-4 h-4" />
                    <span>Editor Portal</span>
                  </Link>
                )}
                <Link to={isEditor ? '/editor-portal' : '/dashboard'}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-500 text-sm font-semibold transition-colors">
                  <img src={user?.avatar} alt={user?.name}
                    className="w-6 h-6 rounded-full object-cover" />
                  <span>{user?.name.split(' ')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isEditor ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {isEditor ? 'EDITOR' : 'CREATOR'}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-semibold text-navy-500 hover:bg-gray-100 transition-colors">
                  Log In
                </Link>
                <Link to="/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-navy-500 to-brandBlue text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsDemoMode(!isDemoMode)}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-amber-50 text-amber-800 border-amber-300">
              {isDemoMode ? 'DEMO' : 'LIVE'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-500 hover:bg-gray-100">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          {isEditor ? (
            <Link to="/editor-portal" onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-navy-500 font-medium hover:bg-gray-50">
              Editor Portal
            </Link>
          ) : (
            <>
              <Link to="/editor-marketplace" onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-navy-500 font-medium hover:bg-gray-50">
                Editor Marketplace
              </Link>
              <Link to="/projects" onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-navy-500 font-medium hover:bg-gray-50">
                My Projects
              </Link>
              <Link to="/analyze" onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-xl bg-navy-500 text-white font-semibold text-sm">
                Analyze Video
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
              className="block w-full text-left px-3 py-2 text-rose-600 font-medium">
              Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-2 rounded-xl border border-gray-300 text-navy-500 font-semibold">
              Log In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
