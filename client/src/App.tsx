import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { ToastContainer } from './components/common/ToastContainer';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ReportPage } from './pages/ReportPage';
import { EditorMarketplacePage } from './pages/EditorMarketplacePage';
import { EditorProfilePage } from './pages/EditorProfilePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DemoProvider>
        <Router>
          <div className="min-h-screen bg-bgLight text-textMain">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/report/:id" element={<ReportPage />} />
              <Route path="/editor-marketplace" element={<EditorMarketplacePage />} />
              <Route path="/editor/:id" element={<EditorProfilePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/comparison/:id" element={<ComparisonPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <ToastContainer />
          </div>
        </Router>
      </DemoProvider>
    </AuthProvider>
  );
};

export default App;
