import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Code, Mail, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Projects', value: '12', icon: <FileText className="w-6 h-6" /> },
    { title: 'Skills', value: '8', icon: <Code className="w-6 h-6" /> },
    { title: 'Messages', value: '5', icon: <Mail className="w-6 h-6" /> },
  ];

  const adminSections = [
    { name: 'Hero Section', path: '/admin/hero', icon: <LayoutDashboard className="w-6 h-6" /> },
    { name: 'Projects', path: '/admin/projects', icon: <FileText className="w-6 h-6" /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code className="w-6 h-6" /> },
    { name: 'Contact Info', path: '/admin/contact', icon: <Mail className="w-6 h-6" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin/login'; // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="flex items-center gap-3 p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-center text-xl font-semibold"
            >
              {section.icon}
              {section.name}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 justify-center p-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 text-center text-xl font-semibold"
          >
            <LogOut className="w-6 h-6" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;