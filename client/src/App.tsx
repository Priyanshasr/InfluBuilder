import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import { EditorPortalPage } from './pages/EditorPortalPage';

/** Protected route — redirect to login if not authenticated */
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Creator Routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/analyze" element={<ProtectedRoute element={<AnalyzePage />} />} />
      <Route path="/report/:id" element={<ProtectedRoute element={<ReportPage />} />} />
      <Route path="/projects" element={<ProtectedRoute element={<ProjectsPage />} />} />
      <Route path="/comparison/:id" element={<ProtectedRoute element={<ComparisonPage />} />} />

      {/* Editor Portal */}
      <Route path="/editor-portal" element={<ProtectedRoute element={<EditorPortalPage />} />} />

      {/* Shared */}
      <Route path="/editor-marketplace" element={<EditorMarketplacePage />} />
      <Route path="/editor/:id" element={<EditorProfilePage />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DemoProvider>
        <Router>
          <div className="min-h-screen bg-bgLight text-textMain">
            <AppRoutes />
            <ToastContainer />
          </div>
        </Router>
      </DemoProvider>
    </AuthProvider>
  );
};

export default App;
