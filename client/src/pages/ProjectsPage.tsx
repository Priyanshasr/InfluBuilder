import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { deleteProjectApi } from '../services/api';
import {
  FolderKanban,
  Video,
  ExternalLink,
  GitCompare,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, setProjects, addToast } = useDemo();
  const [activeTab, setActiveTab] = useState<'all' | 'analyzed' | 'improved' | 'in_progress'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProjectApi(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      addToast('Project deleted', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="My Video Projects" />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Top Header */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-500">Video Content Directory</h1>
              <p className="text-xs text-gray-500 mt-1">Manage and track all draft video audits and before/after improvements</p>
            </div>

            <Link
              to="/analyze"
              className="px-5 py-2.5 rounded-xl bg-navy-500 hover:bg-navy-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Audit New Video</span>
            </Link>
          </div>

          {/* Search & Tabs */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brandBlue"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { key: 'all', label: 'All Projects' },
                { key: 'analyzed', label: 'Analyzed' },
                { key: 'improved', label: 'Improved' },
                { key: 'in_progress', label: 'In Progress' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-card hover:shadow-cardHover transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative group bg-slate-900">
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-md ${
                          proj.status === 'improved'
                            ? 'bg-emerald-500 text-white'
                            : proj.status === 'in_progress'
                            ? 'bg-amber-500 text-white'
                            : 'bg-brandBlue text-white'
                        }`}
                      >
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-navy-500 text-base">{proj.title}</h3>
                        <span className="text-xs text-gray-400">{proj.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block font-medium">Gemini Score</span>
                        <span className="text-xl font-black text-navy-500">{proj.score}/100</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {proj.analysis.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {new Date(proj.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/report/${proj.id}`}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-navy-500 hover:bg-navy-50 transition-colors"
                      title="View Gemini Audit Report"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {proj.status === 'improved' && (
                      <Link
                        to={`/comparison/${proj.id}`}
                        className="p-2 rounded-lg bg-brandBlue-light text-brandBlue hover:bg-blue-100 transition-colors"
                        title="Before / After View"
                      >
                        <GitCompare className="w-4 h-4" />
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};
