import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage'; // ✅ import
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SupervisorLogin from './pages/SupervisorLogin';
import UserDashboard from './pages/UserDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import ApplyCertificate from './pages/ApplyCertificate';
import BirthCertificateForm from './pages/BirthCertificateForm';
import DeathCertificateForm from './pages/DeathCertificateForm';
import StatusPage from './pages/StatusPage';
import VerifyDocument from './pages/VerifyDocument';
import DownloadCertificate from './pages/DownloadCertificate';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import ManageRequests from './pages/ManageRequests';
import ManageOfficers from './pages/ManageOfficers';
import ManageUsers from './pages/ManageUsers';
import ViewReports from './pages/ViewReports';
import ManageGrievances from './pages/ManageGrievances';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/supervisor-login" element={<SupervisorLogin />} />

            {/* ✅ User Routes */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-certificate"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ApplyCertificate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/birth-certificate"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <BirthCertificateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/death-certificate"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DeathCertificateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <StatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <VerifyDocument />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-certificate"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DownloadCertificate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <HelpPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <AboutPage />
                </ProtectedRoute>
              }
            />

            {/* ✅ Officer Routes */}
            <Route
              path="/officer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['officer']}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-requests"
              element={
                <ProtectedRoute allowedRoles={['officer']}>
                  <ManageRequests />
                </ProtectedRoute>
              }
            />

            {/* ✅ Supervisor Routes */}
            <Route
              path="/supervisor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['supervisor']}>
                  <SupervisorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-officers"
              element={
                <ProtectedRoute allowedRoles={['supervisor']}>
                  <ManageOfficers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <ProtectedRoute allowedRoles={['supervisor']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={['supervisor']}>
                  <ViewReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-grievances"
              element={
                <ProtectedRoute allowedRoles={['supervisor']}>
                  <ManageGrievances />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
