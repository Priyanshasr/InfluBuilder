import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { fetchEditorByIdApi } from '../services/api';
import { Editor } from '../types';
import { fallbackEditors } from '../data/mockData';
import {
  Star,
  Clock,
  CheckCircle2,
  Play,
  ArrowLeft,
  ShieldCheck,
  Award,
  Video
} from 'lucide-react';

export const EditorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const local = fallbackEditors.find((e) => e.id === id);
    if (local) {
      setEditor(local);
      setLoading(false);
    } else {
      fetchEditorByIdApi(id).then((ed) => {
        setEditor(ed);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !editor) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgLight flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={`${editor.name}'s Editor Profile`} />

        <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
          
          <Link to="/editor-marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-navy-500">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>

          {/* Profile Hero Header */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={editor.avatar}
                alt={editor.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-brandBlue/30 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-navy-500">{editor.name}</h1>
                  <ShieldCheck className="w-5 h-5 text-brandBlue" />
                </div>
                <span className="text-xs font-bold text-brandBlue block">{editor.specialization}</span>
                <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{editor.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{editor.completedProjects} Projects Completed</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{editor.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy-50 p-4 rounded-2xl border border-navy-100 text-center space-y-2 w-full md:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase block">Starting Price</span>
              <span className="text-3xl font-black text-navy-500 block">${editor.startingPrice}</span>
              <Link
                to="/editor-marketplace"
                className="inline-block w-full px-6 py-2.5 rounded-xl bg-navy-500 hover:bg-navy-600 text-white font-bold text-xs shadow-md"
              >
                Request Edit
              </Link>
            </div>
          </div>

          {/* Details & Portfolio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-6">
              
              {/* About */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-3">
                <h3 className="text-base font-bold text-navy-500">About the Editor</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{editor.bio}</p>
              </div>

              {/* Portfolio Sample */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-500">Sample Portfolio Work</h3>
                  <span className="text-xs font-semibold text-brandBlue">Hook & Retention Edit</span>
                </div>
                <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
                  <video
                    src={editor.portfolioSampleUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            {/* Sidebar Skills & Guarantees */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-card space-y-3">
                <h3 className="text-base font-bold text-navy-500">Specialist Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {editor.skills.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-navy-50 text-navy-600 text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-navy-500 to-navy-700 text-white p-6 rounded-3xl shadow-md space-y-3">
                <div className="flex items-center gap-2 text-brandYellow text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>InfluBuilder Guarantee</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Every edit request includes automatic Gemini Before/After re-analysis to confirm content score improvement.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};
