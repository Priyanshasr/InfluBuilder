import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { fallbackProjects } from '../data/mockData';
import { fetchProjectsApi, fetchApiStatus } from '../services/api';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  geminiConfigured: boolean;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (proj: Project) => void;
  updateProject: (proj: Project) => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  refreshProjects: () => Promise<void>;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [geminiConfigured, setGeminiConfigured] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshProjects = async () => {
    const remoteProjects = await fetchProjectsApi();
    if (remoteProjects && remoteProjects.length > 0) {
      setProjects(remoteProjects);
    }
  };

  useEffect(() => {
    fetchApiStatus().then((res) => {
      setGeminiConfigured(res.geminiConfigured);
      if (!res.geminiConfigured) {
        setIsDemoMode(true);
      }
    });

    refreshProjects();
  }, []);

  const addProject = (proj: Project) => {
    setProjects((prev) => [proj, ...prev]);
  };

  const updateProject = (proj: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === proj.id ? proj : p)));
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        geminiConfigured,
        projects,
        setProjects,
        addProject,
        updateProject,
        toasts,
        addToast,
        removeToast,
        refreshProjects,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
