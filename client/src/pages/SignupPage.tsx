import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
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
          Create your creator account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-200 sm:rounded-2xl sm:px-10 space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-500 uppercase">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
              />
            </div>

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
              Get Started
            </button>
          </form>

          <button
            onClick={handleDemoClick}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Or Skip & Try Demo Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <span className="text-xs text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-xs font-bold text-brandBlue hover:underline">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
