import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, Video, FolderKanban, Users, GitCompare, User, Settings, Sparkles, ArrowUpRight, Wrench, Briefcase, Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isEditor = user?.role === 'editor';

  const creatorNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analyze Video', path: '/analyze', icon: Video, highlight: true },
    { label: 'My Projects', path: '/projects', icon: FolderKanban },
    { label: 'Editor Marketplace', path: '/editor-marketplace', icon: Users },
    { label: 'Comparisons', path: '/comparison/proj-1', icon: GitCompare },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const editorNavItems = [
    { label: 'Editor Portal', path: '/editor-portal', icon: Briefcase, highlight: true },
    { label: 'Browse Marketplace', path: '/editor-marketplace', icon: Users },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const navItems = isEditor ? editorNavItems : creatorNavItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex-col justify-between hidden md:flex sticky top-0 h-screen overflow-y-auto">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-navy-500 to-brandBlue flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-navy-500 tracking-tight">INFLUBUILDER</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-brandBlue uppercase -mt-1">
                <Cpu className="w-3 h-3" /> GENA AI
              </span>
            </div>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="px-4 pt-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${
            isEditor ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-blue-50 text-brandBlue border border-blue-200'
          }`}>
            {isEditor ? <Wrench className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            <span>{isEditor ? 'Video Editor Portal' : 'Creator Dashboard'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? isEditor
                        ? 'bg-orange-50 text-brandOrange font-semibold shadow-sm border border-orange-100'
                        : 'bg-brandBlue-light text-brandBlue font-semibold shadow-sm'
                      : item.highlight
                      ? isEditor ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-navy-500'
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${item.highlight ? (isEditor ? 'text-brandOrange' : 'text-brandOrange') : ''}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* GENA Info Banner */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-600 text-white shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-brandYellow mb-1">
          <Cpu className="w-4 h-4" />
          <span>GENA AI Engine</span>
        </div>
        <p className="text-xs text-gray-200 leading-snug">
          {isEditor
            ? 'GENA pre-analyzes every client video so you know exactly what to fix before editing.'
            : 'Multimodal video understanding analyzing pacing, hook & clarity for creators.'}
        </p>
        <Link to="/#gena-ai"
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-brandBlue-light hover:underline">
          <span>Learn about GENA</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
