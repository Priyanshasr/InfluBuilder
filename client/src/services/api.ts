import { Project, Editor, GeminiAnalysis } from '../types';

const API_BASE = '/api';

export async function fetchApiStatus(): Promise<{ status: string; geminiConfigured: boolean; mode: string }> {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (!res.ok) throw new Error('Status check failed');
    return await res.json();
  } catch (error) {
    return { status: 'offline', geminiConfigured: false, mode: 'Demo Mode (Offline)' };
  }
}

export async function analyzeVideoApi(
  file: File | null,
  title: string,
  category: string,
  forceDemo: boolean
): Promise<{ success: boolean; project: Project; message?: string }> {
  const formData = new FormData();
  if (file) {
    formData.append('video', file);
  }
  formData.append('title', title);
  formData.append('category', category);
  formData.append('forceDemo', String(forceDemo));

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to analyze video');
  }

  return await res.json();
}

export async function uploadImprovedVideoApi(
  projectId: string,
  file: File | null,
  forceDemo: boolean
): Promise<{ success: boolean; project: Project; message?: string }> {
  const formData = new FormData();
  if (file) {
    formData.append('video', file);
  }
  formData.append('forceDemo', String(forceDemo));

  const res = await fetch(`${API_BASE}/projects/${projectId}/improve`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to upload improved video');
  }

  return await res.json();
}

export async function fetchProjectsApi(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data.projects || [];
  } catch (error) {
    console.warn('API error, using local fallback:', error);
    return [];
  }
}

export async function fetchProjectByIdApi(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    if (!res.ok) throw new Error('Project not found');
    const data = await res.json();
    return data.project || null;
  } catch (error) {
    return null;
  }
}

export async function fetchEditorsApi(): Promise<Editor[]> {
  try {
    const res = await fetch(`${API_BASE}/editors`);
    if (!res.ok) throw new Error('Failed to fetch editors');
    const data = await res.json();
    return data.editors || [];
  } catch (error) {
    return [];
  }
}

export async function fetchEditorByIdApi(id: string): Promise<Editor | null> {
  try {
    const res = await fetch(`${API_BASE}/editors/${id}`);
    if (!res.ok) throw new Error('Editor not found');
    const data = await res.json();
    return data.editor || null;
  } catch (error) {
    return null;
  }
}

export async function hireEditorApi(
  projectId: string,
  editorId: string,
  notes: string
): Promise<{ success: boolean; project: Project; message?: string }> {
  const res = await fetch(`${API_BASE}/hire-editor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, editorId, notes }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to submit edit request');
  }

  return await res.json();
}

export async function deleteProjectApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (error) {
    return false;
  }
}
