import { GeminiAnalysis, Project, Editor } from '../types/index';

export const mockEditors: Editor[] = [
  {
    id: 'ed-1',
    name: 'Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    specialization: 'Short-form video & Reels',
    rating: 4.95,
    completedProjects: 84,
    startingPrice: 45,
    deliveryTime: '24 Hours',
    bio: 'Specialized in high-retention short-form video editing, hook optimization, and fast-paced sound design for TikTok & IG Reels.',
    skills: ['Hook Engineering', 'Dynamic Captions', 'Sound FX', 'Color Grading'],
    portfolioSampleUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    reviewsCount: 62,
  },
  {
    id: 'ed-2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    specialization: 'Educational Content & YouTube',
    rating: 4.90,
    completedProjects: 112,
    startingPrice: 85,
    deliveryTime: '48 Hours',
    bio: 'Pacing expert for long-form explanatory videos, tutorials, and podcasts. Helping creators explain complex concepts clearly.',
    skills: ['Motion Graphics', 'Pacing Trimming', 'Audio Cleaning', 'B-Roll Integration'],
    portfolioSampleUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    reviewsCount: 94,
  },
  {
    id: 'ed-3',
    name: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    specialization: 'Business Content & Product Promos',
    rating: 4.88,
    completedProjects: 56,
    startingPrice: 120,
    deliveryTime: '3 Days',
    bio: 'Transforming product demos into high-converting brand stories with cinematic visuals and clear call-to-action overlays.',
    skills: ['CTA Polish', 'Lower Thirds', 'Commercial Pacing', 'Sound Mixing'],
    portfolioSampleUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    reviewsCount: 41,
  },
  {
    id: 'ed-4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    specialization: 'Motion Graphics & Animation',
    rating: 4.98,
    completedProjects: 140,
    startingPrice: 95,
    deliveryTime: '48 Hours',
    bio: '2D/3D motion designer creating visual hooks, kinetic typography, and custom graphic overlays that boost audience clarity.',
    skills: ['After Effects', 'Kinetic Text', 'Custom Graphic FX', 'Visual Clarity'],
    portfolioSampleUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    reviewsCount: 118,
  }
];

export const sampleInstagramReelAnalysis: GeminiAnalysis = {
  overallScore: 74,
  hookScore: 61,
  contentClarityScore: 81,
  pacingScore: 68,
  visualScore: 86,
  audioScore: 79,
  ctaScore: 64,
  summary: "The video presents visually stunning footage and solid audio clarity, but suffers from a delayed intro hook (0-6s) and a passive ending without a clear Call To Action.",
  strengths: [
    "High visual resolution and natural camera lighting throughout",
    "Clear, crisp voiceover with good microphone balance",
    "Strong middle sequence explaining the core productivity concept"
  ],
  issues: [
    {
      title: "Delayed Opening Hook",
      severity: "high",
      explanation: "The first 5 seconds show a slow fade-in and silence, causing viewer drop-off before the key message is stated.",
      recommendation: "Trim the first 4 seconds. Start directly with the key question: 'Are you wasting 2 hours every morning?'"
    },
    {
      title: "Pacing Lag in Mid-Section",
      severity: "medium",
      explanation: "Between 00:14 and 00:22, there is an unedited pause while transitioning between desktop screens.",
      recommendation: "Insert a dynamic jump cut or speed ramp over the screen transition."
    },
    {
      title: "Weak Call-to-Action",
      severity: "medium",
      explanation: "The video ends abruptly on a black screen without guiding the viewer to save, share, or follow.",
      recommendation: "Add an animated visual overlay in the final 3 seconds asking viewers to comment 'PLAN' for the template link."
    }
  ],
  recommendations: [
    "Re-order clip structure to put the outcome first (Start with result, then explain method)",
    "Add kinetic captions for key keywords in the first 10 seconds",
    "Increase audio background music volume slightly to maintain energetic tone"
  ],
  timestamps: [
    {
      start: "00:00",
      end: "00:05",
      issue: "Slow ambient intro with silence",
      recommendation: "Cut intro; start with vocal hook immediately."
    },
    {
      start: "00:14",
      end: "00:21",
      issue: "Awkward pause during browser tab switch",
      recommendation: "Trim dead air and add a sound effect pop."
    }
  ],
  priorityFixes: [
    {
      id: "pf-1",
      title: "Strengthen Opening Hook",
      severity: "high",
      category: "Hook Strength",
      issue: "Opening takes too long to establish value proposition (0-6s delay).",
      recommendation: "Move the high-energy summary statement to 00:00 and cut the title slide delay."
    },
    {
      id: "pf-2",
      title: "Eliminate Screen Transition Lag",
      severity: "medium",
      category: "Pacing",
      issue: "7 seconds of silent screen navigation causes retention drop.",
      recommendation: "Crop to key clicks and apply 1.25x speed ramp with background WHOOSH audio effect."
    }
  ],
  isDemo: true
};

export const sampleInstagramReelImprovedAnalysis: GeminiAnalysis = {
  overallScore: 89,
  hookScore: 92,
  contentClarityScore: 90,
  pacingScore: 88,
  visualScore: 91,
  audioScore: 85,
  ctaScore: 86,
  summary: "Major improvement! The opening hook immediately captures attention within 1.5 seconds, dead air pauses have been eliminated, and a clear kinetic CTA drives action.",
  strengths: [
    "Instant high-impact verbal hook within first 2 seconds",
    "Seamless fast-paced jump cuts retaining audience attention",
    "Professional animated CTA overlay at conclusion"
  ],
  issues: [
    {
      title: "Minor audio peak at 00:18",
      severity: "low",
      explanation: "Background music slightly overlaps vocal cue at 18 seconds.",
      recommendation: "Duck music volume by -3dB during vocal pauses."
    }
  ],
  recommendations: [
    "Publish during peak audience activity window for maximum algorithmic distribution."
  ],
  timestamps: [],
  priorityFixes: [],
  isDemo: true
};

export const sampleEducationalAnalysis: GeminiAnalysis = {
  overallScore: 82,
  hookScore: 88,
  contentClarityScore: 90,
  pacingScore: 78,
  visualScore: 80,
  audioScore: 84,
  ctaScore: 72,
  summary: "Excellent educational breakdown with outstanding clarity. Pacing slows down around the technical definitions section, which could be streamlined with motion graphic diagrams.",
  strengths: [
    "Exceptional topic explanation with simple step-by-step analogies",
    "Engaging enthusiasm and clear pronunciation",
    "Good lighting and professional backdrop"
  ],
  issues: [
    {
      title: "Technical Jargon Overhead",
      severity: "medium",
      explanation: "From 01:10 to 01:40, heavy technical terminology is presented verbally without supporting visual diagrams.",
      recommendation: "Overlay animated diagram graphics or text callouts to visually reinforce technical terms."
    }
  ],
  recommendations: [
    "Use visual split-screens to compare concepts instead of talking head only"
  ],
  timestamps: [
    {
      start: "01:10",
      end: "01:35",
      issue: "Monotonous talking head explanation of complex algorithm",
      recommendation: "Add 2D kinetic diagram overlay."
    }
  ],
  priorityFixes: [
    {
      id: "pf-edu-1",
      title: "Add Visual Diagram Overlay",
      severity: "medium",
      category: "Content Clarity",
      issue: "Verbal explanation of algorithm lacks visual aid.",
      recommendation: "Insert diagram graphic between 01:10 - 01:35."
    }
  ],
  isDemo: true
};

export const sampleProductPromoAnalysis: GeminiAnalysis = {
  overallScore: 77,
  hookScore: 70,
  contentClarityScore: 79,
  pacingScore: 82,
  visualScore: 85,
  audioScore: 74,
  ctaScore: 70,
  summary: "High visual polish and punchy music editing. However, the unique selling feature of the product is mentioned late in the promo, and audio voiceover is slightly muffled.",
  strengths: [
    "Sleek color grading and cinematic macro camera shots",
    "Rhythmic audio beat sync with visual cuts"
  ],
  issues: [
    {
      title: "Core Feature Delayed",
      severity: "high",
      explanation: "The primary product differentiator isn't highlighted until 00:25 into a 30-second promo.",
      recommendation: "Show the key feature in the opening 3 seconds before zooming into secondary benefits."
    }
  ],
  recommendations: [
    "Re-balance audio EQ to bring out treble frequency on product voiceover"
  ],
  timestamps: [
    {
      start: "00:00",
      end: "00:06",
      issue: "Generic lifestyle shot before product reveal",
      recommendation: "Lead immediately with product macro shot."
    }
  ],
  priorityFixes: [
    {
      id: "pf-promo-1",
      title: "Frontload Product Core Feature",
      severity: "high",
      category: "Hook & Product Placement",
      issue: "Differentiator hidden deep in clip structure.",
      recommendation: "Swap clip order to highlight key benefit upfront."
    }
  ],
  isDemo: true
};

export const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    title: '5 Productivity Hacks Reel',
    category: 'Short-Form Reel',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    improvedVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
    score: 74,
    status: 'improved',
    createdAt: '2026-09-28T10:30:00Z',
    analysis: sampleInstagramReelAnalysis,
    improvedAnalysis: sampleInstagramReelImprovedAnalysis,
    editorId: 'ed-1',
    editorStatus: 'completed',
    editorNotes: 'Trimmed opening dead air, added dynamic hook caption, ducked music peaks, and added CTA animated popup.'
  },
  {
    id: 'proj-2',
    title: 'AI Architecture Explained',
    category: 'Educational',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    score: 82,
    status: 'analyzed',
    createdAt: '2026-10-01T14:15:00Z',
    analysis: sampleEducationalAnalysis,
  },
  {
    id: 'proj-3',
    title: 'Smart Desk Organizer Promo',
    category: 'Product Promo',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=400',
    score: 77,
    status: 'in_progress',
    createdAt: '2026-10-02T09:00:00Z',
    analysis: sampleProductPromoAnalysis,
    editorId: 'ed-3',
    editorStatus: 'accepted'
  }
];

export function generateMockAnalysisForFilename(filename: string): GeminiAnalysis {
  // Generate a dynamic realistic analysis
  const scoreBase = Math.floor(Math.random() * 15) + 70; // 70-85
  return {
    overallScore: scoreBase,
    hookScore: Math.min(100, scoreBase - Math.floor(Math.random() * 8)),
    contentClarityScore: Math.min(100, scoreBase + Math.floor(Math.random() * 6)),
    pacingScore: Math.min(100, scoreBase - Math.floor(Math.random() * 6)),
    visualScore: Math.min(100, scoreBase + Math.floor(Math.random() * 10)),
    audioScore: Math.min(100, scoreBase + Math.floor(Math.random() * 5)),
    ctaScore: Math.max(50, scoreBase - 10),
    summary: `Analysis of '${filename}': Gemini identified good visual clarity and engaging content tone, but found high potential for retention boost by optimizing the first 3 seconds and sharpening clip cuts.`,
    strengths: [
      "Visually clear footage with well-framed subjects",
      "Authentic delivery and engaging verbal tone",
      "Good foundational video subject matter"
    ],
    issues: [
      {
        title: "Pacing Lapses in Introduction",
        severity: "high",
        explanation: "The first 4.5 seconds contain silence and clip transition delay before the core hook starts.",
        recommendation: "Cut dead space at the start and begin directly on the impactful statement."
      },
      {
        title: "Subtle Background Noise",
        severity: "medium",
        explanation: "Room reverb and background hiss present in quiet voiceover segments.",
        recommendation: "Apply background noise suppression and gentle high-pass filter."
      }
    ],
    recommendations: [
      "Add kinetic titles for key emphasis words in first 10 seconds",
      "Streamline mid-video topic shift with a zoom transition",
      "End with an explicit CTA overlay encouraging viewers to comment or save"
    ],
    timestamps: [
      {
        start: "00:00",
        end: "00:04",
        issue: "Introductory delay before main hook",
        recommendation: "Trim to 00:01 start."
      }
    ],
    priorityFixes: [
      {
        id: `pf-${Date.now()}-1`,
        title: "Optimize Opening 3-Second Hook",
        severity: "high",
        category: "Hook Strength",
        issue: "Initial delay reduces early viewer retention.",
        recommendation: "Trim dead time and place highest-value visual cut upfront."
      }
    ],
    isDemo: true
  };
}
