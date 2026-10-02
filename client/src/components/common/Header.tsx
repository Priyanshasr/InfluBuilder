import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { Search, Bell, Sparkles } from 'lucide-react';

export const Header: React.FC<{ title?: string }> = ({ title = "Dashboard" }) => {
  const { user } = useAuth();
  const { isDemoMode, setIsDemoMode } = useDemo();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-navy-500">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-brandBlue"
          />
        </div>

        {/* Demo Mode Badge Toggle */}
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isDemoMode
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isDemoMode ? 'DEMO MODE' : 'REAL GEMINI API'}</span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-navy-500 rounded-xl hover:bg-gray-100 relative">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-brandOrange absolute top-2 right-2" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-navy-500">{user?.name}</span>
            <span className="block text-[10px] text-gray-500">{user?.creatorType}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
