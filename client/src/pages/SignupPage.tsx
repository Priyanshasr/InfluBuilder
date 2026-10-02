import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, Video, Wrench, Cpu } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
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

  return (
    <div className="min-h-screen bg-bgLight flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-3 justify-center">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-navy-500 via-brandBlue to-brandOrange flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-2xl tracking-tight text-navy-500 block">INFLUBUILDER</span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest -mt-1 block">
              Powered by GENA AI
            </span>
          </div>
        </Link>
        <h2 className="mt-5 text-2xl font-extrabold text-navy-500">Create your account</h2>
        <p className="mt-1 text-xs text-gray-500">Join as a Creator or Video Editor</p>
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
                  role === 'creator' ? 'border-brandBlue bg-brandBlue-light' : 'border-gray-200 hover:border-gray-300'
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
                  role === 'editor' ? 'border-brandOrange bg-brandOrange-light' : 'border-gray-200 hover:border-gray-300'
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder={role === 'editor' ? 'Marcus Chen' : 'Alex Rivera'}
                className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue" />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'editor' ? 'editor@studio.io' : 'creator@studio.io'}
                className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue" />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue" />
            </div>
            <button type="submit"
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md text-white ${
                role === 'editor' ? 'bg-brandOrange hover:bg-orange-600' : 'bg-navy-500 hover:bg-navy-600'
              }`}>
              Create {role === 'creator' ? 'Creator' : 'Video Editor'} Account
            </button>
          </form>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { loginAsCreatorDemo(); navigate('/dashboard'); }}
              className="py-2 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-colors">
              <Video className="w-3.5 h-3.5" /> Creator Demo
            </button>
            <button onClick={() => { loginAsEditorDemo(); navigate('/editor-portal'); }}
              className="py-2 px-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-100 transition-colors">
              <Wrench className="w-3.5 h-3.5" /> Editor Demo
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brandBlue hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
