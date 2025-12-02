import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  User,
  FileText,
  CheckCircle,
  Shield,
  HelpCircle,
  Info
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <NavLink to={`/${user.role}-dashboard`} className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="font-bold text-xl">DigiCert Portal</span>
            </NavLink>

            {user.role === 'user' && (
              <div className="hidden md:flex items-center space-x-6">
                <NavLink
                  to="/apply-certificate"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <FileText className="h-4 w-4" />
                  <span>Apply</span>
                </NavLink>

                <NavLink
                  to="/status"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Status</span>
                </NavLink>

                <NavLink
                  to="/verify"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <Shield className="h-4 w-4" />
                  <span>Verify</span>
                </NavLink>

                <NavLink
                  to="/download-certificate"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <FileText className="h-4 w-4" />
                  <span>Download</span>
                </NavLink>

                <NavLink
                  to="/help"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{user.name}</span>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded-full capitalize">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
