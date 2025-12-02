import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  UserCheck,
  Clock,
  CheckCircle,
  Download,
  Users,
  HelpCircle,
  ArrowRightCircle,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl text-center">
        {/* Header Icon and Title */}
        <div className="flex justify-center mb-4">
          <ShieldCheck className="h-14 w-14 text-blue-700" />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Digital Certificate Generator</h1>
        <p className="text-gray-700 text-lg mb-6">
          A modern solution for secure, verified, and paperless certificate generation and distribution.
        </p>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
          <div className="flex items-start gap-4">
            <FileText className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Apply for Certificates</h2>
              <p className="text-gray-600 text-sm">Fill simple digital forms for Birth/Death certificates.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Real-Time Status Tracking</h2>
              <p className="text-gray-600 text-sm">Track application progress from submission to approval.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Officer/Supervisor Workflow</h2>
              <p className="text-gray-600 text-sm">Multi-level approval system for document verification.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Download className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Digital Downloads</h2>
              <p className="text-gray-600 text-sm">Download signed, QR-secured certificates anytime.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Role-Based Access</h2>
              <p className="text-gray-600 text-sm">Separate portals for Users, Officers, and Supervisors.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <HelpCircle className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h2 className="font-semibold text-blue-700">Grievance Redressal</h2>
              <p className="text-gray-600 text-sm">Users can raise issues and get support quickly.</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg flex items-center gap-2 mx-auto transition"
        >
          Get Started <ArrowRightCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
