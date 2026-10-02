import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, Video, Wrench, CheckCircle2, Cpu } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('creator');
  const { login, loginAsCreatorDemo, loginAsEditorDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, role);
      navigate(role === 'editor' ? '/editor-portal' : '/dashboard');
    }
  };

  const handleCreatorDemo = () => {
    loginAsCreatorDemo();
    navigate('/dashboard');
  };

  const handleEditorDemo = () => {
    loginAsEditorDemo();
    navigate('/editor-portal');
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-3 justify-center">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-navy-500 via-brandBlue to-brandOrange flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-2xl tracking-tight text-navy-500 block">INFLUBUILDER</span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest -mt-1 block flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Powered by GENA AI
            </span>
          </div>
        </Link>
        <h2 className="mt-5 text-2xl font-extrabold text-navy-500">Welcome back</h2>
        <p className="mt-1 text-xs text-gray-500">Sign in to your account or jump into a demo instantly</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-gray-200 rounded-3xl space-y-6">

          {/* Role Selector */}
          <div>
            <p className="text-xs font-bold text-navy-500 uppercase mb-2">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                  role === 'creator'
                    ? 'border-brandBlue bg-brandBlue-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Video className={`w-5 h-5 mt-0.5 flex-shrink-0 ${role === 'creator' ? 'text-brandBlue' : 'text-gray-400'}`} />
                <div>
                  <span className={`font-bold text-sm block ${role === 'creator' ? 'text-navy-500' : 'text-gray-600'}`}>Creator</span>
                  <span className="text-[10px] text-gray-400">Upload & audit videos</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('editor')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                  role === 'editor'
                    ? 'border-brandOrange bg-brandOrange-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wrench className={`w-5 h-5 mt-0.5 flex-shrink-0 ${role === 'editor' ? 'text-brandOrange' : 'text-gray-400'}`} />
                <div>
                  <span className={`font-bold text-sm block ${role === 'editor' ? 'text-navy-500' : 'text-gray-600'}`}>Video Editor</span>
                  <span className="text-[10px] text-gray-400">Manage client projects</span>
                </div>
              </button>
            </div>
          </div>

          {/* One-Click Demo Access */}
          <div className={`rounded-2xl p-4 border space-y-3 ${role === 'editor' ? 'bg-orange-50 border-orange-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className={`flex items-center gap-2 font-bold text-xs ${role === 'editor' ? 'text-orange-800' : 'text-amber-800'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Hackathon One-Click Demo — No Registration Needed</span>
            </div>
            <p className="text-xs text-gray-600">
              {role === 'creator'
                ? 'Explore pre-loaded GENA content audits, marketplace, and before/after comparisons as a creator.'
                : 'Explore the Editor Portal with incoming client project requests and GENA audit reports.'
              }
            </p>
            <button
              onClick={role === 'creator' ? handleCreatorDemo : handleEditorDemo}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                role === 'editor'
                  ? 'bg-brandOrange hover:bg-orange-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              <span>Try {role === 'creator' ? 'Creator' : 'Editor'} Demo Instantly</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-3 text-xs text-gray-400 font-semibold">OR SIGN IN</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'editor' ? 'editor@studio.io' : 'creator@studio.io'}
                className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md text-white ${
                role === 'editor' ? 'bg-brandOrange hover:bg-orange-600' : 'bg-navy-500 hover:bg-navy-600'
              }`}
            >
              Sign In as {role === 'creator' ? 'Creator' : 'Video Editor'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            New here?{' '}
            <Link to="/signup" className="font-bold text-brandBlue hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
