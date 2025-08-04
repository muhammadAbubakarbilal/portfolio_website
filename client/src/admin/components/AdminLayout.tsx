import React from 'react';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Folder, Settings, User, MessageSquare, Sun, Moon, Menu, Bell, LogOut } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useTheme } from '../../components/ThemeProvider';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showTestToast = () => {
    toast({
      title: 'Test Notification',
      description: 'This is a test toast notification!',
      variant: 'default',
    });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Hero Section', path: '/admin/hero', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: Folder },
    { name: 'Skills', path: '/admin/skills', icon: Settings },
    { name: 'Contact Info', path: '/admin/contact', icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white p-6 space-y-6 fixed h-screen transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white">
            <Menu size={24} />
          </button>
        </div>
        <nav>
          <ul className="space-y-2 mt-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                  <item.icon size={20} className="mr-3" />
                  <span className={`${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={showTestToast}
                className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
              >
                <Bell size={20} className="mr-3" />
                <span className={`${!isSidebarOpen && 'hidden'}`}>Show Toast</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-red-700 transition duration-200 text-red-300"
              >
                <LogOut size={20} className="mr-3" />
                <span className={`${!isSidebarOpen && 'hidden'}`}>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="flex justify-end mb-6">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {theme === 'dark' ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-800" />}
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;