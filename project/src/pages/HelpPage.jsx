import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { grievanceService } from '../services/grievanceService';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Send,
  AlertCircle,
  FileText,
  Shield
} from 'lucide-react';

const HelpPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('faq');
  const [grievanceDescription, setGrievanceDescription] = useState('');
  const [submittingGrievance, setSubmittingGrievance] = useState(false);
  const [userGrievances] = useState(() => {
    if (user) {
      return grievanceService.getUserGrievances(user.id);
    }
    return [];
  });

  const handleSubmitGrievance = async (e) => {
    e.preventDefault();
    if (!grievanceDescription.trim()) return;

    setSubmittingGrievance(true);
    
    try {
      const grievanceId = grievanceService.submitGrievance(user.id, grievanceDescription);
      alert(`Grievance submitted successfully! ID: ${grievanceId}`);
      setGrievanceDescription('');
      // In a real app, we would refresh the grievances list here
    } catch (error) {
      alert('Failed to submit grievance. Please try again.');
    } finally {
      setSubmittingGrievance(false);
    }
  };

  const faqData = [
    {
      question: "How long does it take to process a certificate request?",
      answer: "Birth certificates typically take 3-5 working days, while death certificates take 2-4 working days to process after document verification."
    },
    {
      question: "What documents do I need for a birth certificate?",
      answer: "You need hospital records, parent's ID proof, Aadhaar card copy, and any additional supporting documents as specified in the form."
    },
    {
      question: "Can I track my application status?",
      answer: "Yes! You can track your application status in real-time using the 'Status' page in your dashboard. You'll see if your request is pending, approved, or rejected."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, net banking, and UPI payments. The fee is ₹50 for both birth and death certificates."
    },
    {
      question: "Why was my request rejected?",
      answer: "Requests may be rejected due to incomplete documents, invalid information, or quality issues. Check the officer's comment in your status page for specific reasons."
    },
    {
      question: "Can I edit my application after submission?",
      answer: "No, applications cannot be edited after submission. If there are errors, you may need to submit a new request or contact our support team."
    },
    {
      question: "How do I verify the authenticity of my certificate?",
      answer: "Use our 'Verify Document' feature by uploading your certificate. Our system will check it against our secure database."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect your personal information and documents."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <HelpCircle className="mx-auto h-16 w-16 text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get assistance with your certificate requests and account</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'faq'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab('grievance')}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'grievance'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Submit Grievance
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'contact'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Contact Us
        </button>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          {faqData.map((faq, index) => (
            <details key={index} className="bg-white rounded-lg shadow-md">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                {faq.question}
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}

          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">Application Process</h3>
              <p className="text-blue-700 text-sm">Learn about the step-by-step certificate application process</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Shield className="mx-auto h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-green-900 mb-2">Document Security</h3>
              <p className="text-green-700 text-sm">Understand our security measures and verification process</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <Clock className="mx-auto h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-purple-900 mb-2">Processing Times</h3>
              <p className="text-purple-700 text-sm">Check expected processing times for different certificate types</p>
            </div>
          </div>
        </div>
      )}

      {/* Grievance Tab */}
      {activeTab === 'grievance' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit a Grievance</h2>
            <p className="text-gray-600 mb-6">
              Have an issue with your certificate request or our services? Submit your complaint here and our team will address it promptly.
            </p>

            <form onSubmit={handleSubmitGrievance} className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Issue *
                  </label>
                  <textarea
                    rows={6}
                    value={grievanceDescription}
                    onChange={(e) => setGrievanceDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide detailed information about your issue, including request ID if applicable..."
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Before Submitting</h4>
                      <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                        <li>• Check your application status first</li>
                        <li>• Include your request ID if related to a specific application</li>
                        <li>• Be specific about the issue you're facing</li>
                        <li>• Allow 2-3 business days for response</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingGrievance || !grievanceDescription.trim()}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{submittingGrievance ? 'Submitting...' : 'Submit Grievance'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Previous Grievances */}
          {userGrievances.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Previous Grievances</h3>
              <div className="space-y-4">
                {userGrievances.map((grievance) => (
                  <div key={grievance.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Grievance ID: {grievance.id}</span>
                        <p className="text-sm text-gray-500">
                          Submitted: {new Date(grievance.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        grievance.status === 'resolved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {grievance.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{grievance.description}</p>
                    
                    {grievance.response && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3">
                        <h4 className="text-sm font-medium text-green-800 mb-1">Response</h4>
                        <p className="text-green-700 text-sm">{grievance.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Support</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Helpline</p>
                    <p className="text-gray-600">1800-XXX-XXXX (Toll Free)</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-gray-600">support@digicert.gov.in</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-gray-600">Available on website</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 5 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Support</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Technical Helpline</p>
                    <p className="text-gray-600">1800-XXX-TECH</p>
                    <p className="text-sm text-gray-500">For website and app issues</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Technical Email</p>
                    <p className="text-gray-600">tech@digicert.gov.in</p>
                    <p className="text-sm text-gray-500">For technical issues only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Address</h3>
            <div className="text-gray-600">
              <p className="font-medium">Government Digital Certificate Office</p>
              <p>Ministry of Electronics & Information Technology</p>
              <p>Electronics Niketan, 6 CGO Complex</p>
              <p>Lodhi Road, New Delhi - 110003</p>
              <p className="mt-2">
                <span className="font-medium">Office Hours:</span> Monday - Friday, 9:30 AM - 5:30 PM
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Contact</h3>
            <p className="text-red-700 mb-2">
              For urgent certificate requirements (medical emergencies, legal deadlines):
            </p>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-900">Emergency Hotline: 1800-XXX-URGENT</span>
            </div>
            <p className="text-sm text-red-600 mt-2">Available 24/7 for genuine emergencies only</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPage;