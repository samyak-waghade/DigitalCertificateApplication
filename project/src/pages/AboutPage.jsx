import React from 'react';
import { Shield, Users, Clock, CheckCircle, Lock, Globe, Award, Zap } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Fast Processing",
      description: "Get your certificates processed in just 2-5 working days, compared to weeks in traditional systems."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Secure & Authentic",
      description: "Bank-level security with digital signatures ensures your certificates are tamper-proof and verifiable."
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "24/7 Accessibility",
      description: "Apply for certificates anytime, anywhere. No need to visit government offices during working hours."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      title: "Real-time Tracking",
      description: "Track your application status in real-time with instant notifications and updates."
    }
  ];

  const benefits = [
    "No physical visits to government offices required",
    "Paperless application process",
    "Instant payment processing and receipts",
    "Digital verification system",
    "Multi-device compatibility",
    "Automated status notifications",
    "Secure document storage",
    "Quick grievance resolution"
  ];

  const stats = [
    { number: "50,000+", label: "Certificates Issued" },
    { number: "99.8%", label: "Uptime Guarantee" },
    { number: "2-5", label: "Days Processing" },
    { number: "24/7", label: "Service Availability" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About DigiCert Portal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionizing government certificate services through digital transformation, 
          making essential documents accessible to every citizen with just a few clicks.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg opacity-90 max-w-4xl mx-auto">
            To digitize and streamline government certificate services, eliminating bureaucratic delays 
            and providing citizens with fast, secure, and accessible digital solutions for their essential 
            document needs.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose DigiCert Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional vs Digital Comparison */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Traditional vs Digital Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Process */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-900">Traditional Method</h3>
            </div>
            <ul className="space-y-2 text-red-800">
              <li>• Visit government office multiple times</li>
              <li>• Wait in long queues for hours</li>
              <li>• Fill physical forms and submit documents</li>
              <li>• Wait 2-4 weeks for processing</li>
              <li>• Make additional visits for status updates</li>
              <li>• Risk of document loss or damage</li>
              <li>• Limited office hours (9 AM - 5 PM)</li>
              <li>• High transportation and time costs</li>
            </ul>
          </div>

          {/* Digital Process */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900">DigiCert Method</h3>
            </div>
            <ul className="space-y-2 text-green-800">
              <li>• Apply online from anywhere, anytime</li>
              <li>• No queues or waiting times</li>
              <li>• Digital forms with smart validation</li>
              <li>• Processing in just 2-5 working days</li>
              <li>• Real-time status tracking</li>
              <li>• Secure cloud storage of documents</li>
              <li>• 24/7 service availability</li>
              <li>• Zero transportation costs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Platform Benefits</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Security & Privacy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">All data is encrypted using industry-standard AES-256 encryption</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Signatures</h3>
            <p className="text-gray-600">Certificates are digitally signed to prevent tampering and forgery</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
            <p className="text-gray-600">Fully compliant with government data protection regulations</p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Built with Modern Technology</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
              <p className="text-gray-600 text-sm">React, Bootstrap, JavaScript</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
              <p className="text-gray-600 text-sm">JWT, AES-256, HTTPS</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Storage</h4>
              <p className="text-gray-600 text-sm">Cloud Database, Secure Backups</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Integration</h4>
              <p className="text-gray-600 text-sm">Payment Gateway, Email/SMS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-600 rounded-lg text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Your Digital Certificate?</h2>
        <p className="text-lg opacity-90 mb-6">
          Join thousands of satisfied citizens who have simplified their document needs with DigiCert Portal
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;