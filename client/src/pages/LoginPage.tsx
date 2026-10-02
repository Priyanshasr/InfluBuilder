import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  const handleDemoClick = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-500 via-brandBlue to-brandOrange flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-navy-500">INFLUBUILDER</span>
        </Link>
        <h2 className="mt-6 text-2xl font-extrabold text-navy-500 tracking-tight">
          Sign in to your creator account
        </h2>
        <p className="mt-2 text-xs text-gray-500">
          Or test all features instantly with hackathon demo access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-200 sm:rounded-2xl sm:px-10 space-y-6">
          
          {/* Prominent Demo Login Banner */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Hackathon One-Click Demo Mode</span>
            </div>
            <p className="text-xs text-amber-700">
              No registration needed. Explore pre-loaded Gemini audits, editor marketplace, and before/after comparisons.
            </p>
            <button
              onClick={handleDemoClick}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Try Demo Account Instantly</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold">OR ENTER CREDENTIALS</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@studio.io"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-navy-500 hover:bg-navy-600 text-white font-bold text-sm transition-all shadow-md"
            >
              Sign In
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-gray-500">Don't have an account? </span>
            <Link to="/signup" className="text-xs font-bold text-brandBlue hover:underline">
              Create an account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
