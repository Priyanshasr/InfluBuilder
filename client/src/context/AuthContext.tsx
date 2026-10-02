import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  loginAsCreatorDemo: () => void;
  loginAsEditorDemo: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoCreator: User = {
  id: 'usr-creator-demo',
  name: 'Alex Rivera',
  email: 'alex@creativestudio.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'creator',
  creatorType: 'Tech & Productivity Creator',
  contentCategories: ['Instagram Reels', 'YouTube Shorts', 'Educational Tutorials'],
  bio: 'Building tech tutorials and productivity tips for 150K+ creators. Using GENA AI audits to maximize retention.',
  stats: { videosAnalyzed: 18, projectsCompleted: 14, averageScore: 81 },
};

const demoEditor: User = {
  id: 'usr-editor-demo',
  name: 'Marcus Chen',
  email: 'marcus@editpro.io',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  role: 'editor',
  bio: 'Pacing expert for long-form explanatory videos, tutorials, and podcasts. Expert in GENA-guided edits.',
  stats: { videosAnalyzed: 0, projectsCompleted: 112, averageScore: 0 },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: UserRole) => {
    if (role === 'editor') {
      setUser({ ...demoEditor, email, name: email.split('@')[0] || 'Editor User' });
    } else {
      setUser({ ...demoCreator, email, name: email.split('@')[0] || 'Creator User' });
    }
  };

  const loginAsCreatorDemo = () => setUser(demoCreator);
  const loginAsEditorDemo = () => setUser(demoEditor);
  const logout = () => setUser(null);
  const updateProfile = (updated: Partial<User>) => {
    if (user) setUser({ ...user, ...updated });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsCreatorDemo, loginAsEditorDemo, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
