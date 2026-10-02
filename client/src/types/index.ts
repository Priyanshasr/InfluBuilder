export type Severity = 'high' | 'medium' | 'low';
export type UserRole = 'creator' | 'editor';

export interface IssueItem {
  title: string;
  severity: Severity;
  explanation: string;
  recommendation: string;
}

export interface TimestampItem {
  start: string;
  end: string;
  issue: string;
  recommendation: string;
}

export interface PriorityFixItem {
  id: string;
  title: string;
  severity: Severity;
  issue: string;
  recommendation: string;
  category: string;
}

export interface GeminiAnalysis {
  overallScore: number;
  hookScore: number;
  contentClarityScore: number;
  pacingScore: number;
  visualScore: number;
  audioScore: number;
  ctaScore: number;
  summary: string;
  strengths: string[];
  issues: IssueItem[];
  recommendations: string[];
  timestamps: TimestampItem[];
  priorityFixes: PriorityFixItem[];
  isDemo?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  originalVideoUrl: string;
  improvedVideoUrl?: string;
  thumbnailUrl: string;
  score: number;
  status: 'analyzed' | 'in_progress' | 'improved';
  createdAt: string;
  analysis: GeminiAnalysis;
  improvedAnalysis?: GeminiAnalysis;
  editorId?: string;
  editorStatus?: 'pending' | 'accepted' | 'in_review' | 'completed';
  editorNotes?: string;
  clientName?: string;
}

export interface Editor {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  completedProjects: number;
  startingPrice: number;
  deliveryTime: string;
  bio: string;
  skills: string[];
  portfolioSampleUrl: string;
  reviewsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  creatorType?: string;
  contentCategories?: string[];
  bio: string;
  stats: {
    videosAnalyzed: number;
    projectsCompleted: number;
    averageScore: number;
  };
}
