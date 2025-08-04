import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HeroAdmin from './admin/pages/HeroAdmin';
import ProjectsAdmin from './admin/pages/ProjectsAdmin';
import ProjectForm from './admin/pages/ProjectForm';
import SkillsAdmin from './admin/pages/SkillsAdmin';
import ContactAdmin from './admin/pages/ContactAdmin';
import AdminLayout from './admin/components/AdminLayout';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <AdminLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="hero" element={<HeroAdmin />} />
                    <Route path="projects" element={<ProjectsAdmin />} />
                    <Route path="projects/new" element={<ProjectForm />} />
                    <Route path="projects/edit/:id" element={<ProjectForm />} />
                    <Route path="skills" element={<SkillsAdmin />} />
                    <Route path="contact" element={<ContactAdmin />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
