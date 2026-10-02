import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useDemo } from '../context/DemoContext';
import { fetchEditorsApi, hireEditorApi } from '../services/api';
import { Editor, Project } from '../types';
import { fallbackEditors } from '../data/mockData';
import {
  Star,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Search,
  ArrowRight,
  Shield,
  X,
  Upload
} from 'lucide-react';

export const EditorMarketplacePage: React.FC = () => {
  const { projects, updateProject, addToast } = useDemo();
  const [editors, setEditors] = useState<Editor[]>(fallbackEditors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [hireModalEditor, setHireModalEditor] = useState<Editor | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [editNotes, setEditNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEditorsApi().then((list) => {
      if (list && list.length > 0) setEditors(list);
    });
    if (projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects]);

  const filteredEditors = editors.filter((ed) => {
    const matchesSearch =
      ed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ed.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || ed.specialization.includes(selectedSpec);
    return matchesSearch && matchesSpec;
  });

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hireModalEditor || !selectedProjectId) return;

    setIsSubmitting(true);
    try {
      const res = await hireEditorApi(selectedProjectId, hireModalEditor.id, editNotes);
      if (res.project) {
        updateProject(res.project);
      }
      addToast(`Edit request submitted to ${hireModalEditor.name}!`, 'success');
      setHireModalEditor(null);
      setEditNotes('');
    } catch (err: any) {
      addToast(err.message || 'Failed to send edit request', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Editor Marketplace" />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Marketplace Banner */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brandOrange uppercase tracking-wider">Human + AI Synergy</span>
              <h1 className="text-2xl font-black text-navy-500">Verified Video Editors</h1>
              <p className="text-xs text-gray-500 mt-1">
                Connect directly with editor specialists who execute Gemini's AI audit recommendations.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 text-navy-600 text-xs font-bold border border-navy-100">
              <Shield className="w-4 h-4 text-brandBlue" />
              <span>Guaranteed Quality Delivery</span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search editor skills or name..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brandBlue"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Short-form', 'Educational', 'Business', 'Motion graphics'].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedSpec === spec
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredEditors.map((editor) => (
              <div
                key={editor.id}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={editor.avatar}
                        alt={editor.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                      />
                      <div>
                        <h3 className="font-bold text-navy-500 text-base">{editor.name}</h3>
                        <span className="text-xs text-brandBlue font-semibold block">{editor.specialization}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{editor.rating}</span>
                          </div>
                          <span className="text-[11px] text-gray-400">({editor.reviewsCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-400 block">Starting at</span>
                      <span className="text-xl font-black text-navy-500">${editor.startingPrice}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{editor.bio}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {editor.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 text-navy-500 font-semibold text-[10px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{editor.deliveryTime} Turnaround</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/editor/${editor.id}`}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-500 font-bold text-xs transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => setHireModalEditor(editor)}
                      className="px-4 py-2 rounded-xl bg-navy-500 hover:bg-navy-600 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      Hire Editor
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Request Edit Project Modal */}
      {hireModalEditor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-gray-200">
            <button
              onClick={() => setHireModalEditor(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-brandBlue uppercase">Send Project to Editor</span>
              <h3 className="text-xl font-black text-navy-500 mt-1">Hire {hireModalEditor.name}</h3>
              <p className="text-xs text-gray-500">{hireModalEditor.specialization} • ${hireModalEditor.startingPrice} starting</p>
            </div>

            <form onSubmit={handleHireSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Select Video Project</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (Gemini Score: {p.score}/100)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-500 uppercase mb-1">Required Edits & Instructions</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Please trim opening 4 seconds as flagged in Gemini report, add dynamic captions, and speed ramp screen transition..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brandBlue"
                />
              </div>

              <div className="p-3 bg-brandBlue-light/40 rounded-xl text-xs text-navy-600 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Turnaround Time:</span>
                  <span>{hireModalEditor.deliveryTime}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Gemini Report Attached:</span>
                  <span className="text-emerald-600">✓ Automatic</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-navy-500 hover:bg-navy-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request to Editor'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
