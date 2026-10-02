import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  FolderKanban,
  Users,
  GitCompare,
  User,
  Settings,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analyze Video', path: '/analyze', icon: Video, highlight: true },
    { label: 'My Projects', path: '/projects', icon: FolderKanban },
    { label: 'Editor Marketplace', path: '/editor-marketplace', icon: Users },
    { label: 'Comparisons', path: '/comparison/proj-1', icon: GitCompare },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between hidden md:flex sticky top-0 h-screen overflow-y-auto">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-navy-500 to-brandBlue flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-navy-500 tracking-tight">INFLUBUILDER</span>
              <span className="block text-[10px] font-bold text-brandBlue uppercase -mt-1">Creator Suite</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-brandBlue-light text-brandBlue font-semibold shadow-sm'
                      : item.highlight
                      ? 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-navy-500'
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${item.highlight ? 'text-brandOrange' : ''}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Gemini Info Banner */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-600 text-white shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-brandYellow mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Gemini Intelligence</span>
        </div>
        <p className="text-xs text-gray-200 leading-snug">
          Multimodal video understanding layer analyzing pacing, hook & clarity.
        </p>
        <Link
          to="/#gemini-ai"
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-brandBlue-light hover:underline"
        >
          <span>Learn Gemini Engine</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
