# INFLUBUILDER — AI-Powered Content Improvement & Creator–Editor Platform

> **Built for the Google Gemini API Hackathon**
> **Core AI: GENA (General ENgagement Analyst) — powered by Google Gemini**

[![Demo](https://img.shields.io/badge/Demo-Live-green)](#) [![Gemini](https://img.shields.io/badge/AI-GENA%20%28Gemini%20Backend%29-blue)](#) [![License](https://img.shields.io/badge/License-MIT-yellow)](#)

---

## What is GENA?

**GENA (General ENgagement Analyst)** is InfluBuilder's core AI brain — an intelligent content audit system built on top of Google Gemini's multimodal API. GENA watches your video (frames + audio), reads structure, and delivers a structured content quality report.

> "Don't just create content. Understand what makes it better — before you publish."

---

## Overview

InfluBuilder is a **complete production-quality MVP** that demonstrates the **BEST USE OF THE GOOGLE GEMINI API** hackathon theme. GENA sits at the core of every feature:

| Feature | GENA's Role |
|---|---|
| Video Content Audit | Multimodal analysis of video + audio via Gemini File API |
| Structured AI Report | JSON schema-validated scores + timestamp-specific issues |
| Before vs After Comparison | GENA re-analyzes revised video to measure editor's improvement |
| Editor Marketplace | Editors receive GENA audit pre-attached to every project |
| Creator Dashboard | Visualizes GENA content scores over time |

---

## Key Features

### 👨‍🎨 For Creators
- **Upload any MP4/MOV/WEBM video draft** — drag & drop or file picker
- **GENA Content Audit** — instant AI analysis of hook, pacing, audio, CTA, clarity, visual quality
- **Timestamp-Specific Feedback** — GENA pinpoints exact seconds where issues occur
- **Priority Fix Workflow** — top 3 ranked improvements with severity levels
- **Editor Marketplace** — hire verified video editors, sharing the GENA audit directly

### 🎬 For Video Editors
- **Editor Portal** — dedicated workspace with incoming project requests
- **Pre-Attached GENA Reports** — see the full audit before opening the timeline
- **Submit Revised Videos** — GENA automatically re-audits and generates Before/After reports
- **GENA Score Tracking** — see average score improvement across completed projects

### 🧠 AI / GENA Capabilities
- Google Gemini **multimodal** video + audio understanding
- Structured **JSON diagnostics** with schema validation
- **6-dimension scoring**: Hook · Pacing · Clarity · Visual · Audio · CTA
- Demo fallback mode when API key is not configured (perfect for hackathon demos)
- Before vs After score comparison with percentage gain

---

## Dual-Role Architecture

InfluBuilder supports two user types with a unified login experience:

| Role | Entry Point | GENA Features |
|---|---|---|
| **Creator** | `/dashboard` + `/analyze` | Upload, audit, hire editor, view Before/After |
| **Video Editor** | `/editor-portal` | Accept jobs, view GENA pre-audit, upload revised edits |

Both roles share the same login page at `/login` with a one-click demo for each role.

---

## Tech Stack

### Frontend
- **React + TypeScript** (Vite)
- **Tailwind CSS** — custom design system (navy + blue + orange)
- **Framer Motion** — micro-animations and transitions
- **Recharts** — AI score visualization charts
- **React Router DOM v6** — client-side routing

### Backend
- **Express.js + TypeScript**
- **@google/generative-ai** — GENA (Gemini API)
- **Multer** — video file upload handling
- **In-memory project store** (demo-ready, production-ready to swap for MongoDB)

---

## Project Structure

```
influbuilder/
├── client/                  # React/Vite frontend
│   └── src/
│       ├── pages/           # All route pages incl. LoginPage, EditorPortalPage
│       ├── components/      # Navbar, Sidebar, Footer, ScoreCard, ReportCard...
│       ├── context/         # AuthContext (Creator/Editor), DemoContext
│       ├── services/        # API layer (api.ts)
│       └── types/           # Shared TypeScript interfaces
└── server/                  # Express backend
    └── src/
        ├── services/        # gemini.service.ts (GENA engine), mock.service.ts
        ├── controllers/     # analysis.controller.ts
        ├── routes/          # api.routes.ts
        └── types/           # Shared type definitions
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Priyanshasr/InfluBuilder.git
cd InfluBuilder
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

> **Without a GEMINI_API_KEY**, the app runs in **GENA Demo Mode** — all features work with realistic mock data. Perfect for judges and hackathon demos.

### 3. Install Dependencies

```bash
# From root
npm run install:all
```

### 4. Run Development Servers

```bash
# From root (starts both client and server)
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000/api

---

## Demo Quick-Start (No API Key Needed)

1. Go to `/login`
2. Click **"Try Creator Demo Instantly"** — jumps into the Creator Dashboard
3. Go to **Analyze Video** → upload any video → see GENA report
4. Go to `/login` → select **Video Editor** → click **"Try Editor Demo Instantly"**
5. Accept a project, view the pre-attached GENA audit, upload a revised video

---

## Hackathon Theme: Best Use of Google Gemini API

| Criterion | How GENA Delivers |
|---|---|
| **Core Use** | Gemini is the analysis engine, not a chatbot |
| **Multimodal** | Video frames + audio processed together |
| **Structured Output** | Schema-validated JSON with 6 score dimensions |
| **End-to-End Workflow** | Upload → Audit → Fix → Verify — all GENA-driven |
| **Dual Roles** | Creator and Editor both benefit from Gemini intelligence |
| **Demo Ready** | Runs fully without API key via GENA Demo Mode |

---

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (optional — GENA Demo Mode runs without it) |
| `PORT` | Server port (default: 5000) |
| `VITE_API_URL` | Frontend API URL (default: http://localhost:5000/api) |

---

## License

MIT License © 2024 InfluBuilder
