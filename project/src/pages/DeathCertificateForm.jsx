import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { certificateService } from '../services/certificateService';
import { Upload, CreditCard, FileText, AlertCircle } from 'lucide-react';

const DeathCertificateForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState([]);

  const [formData, setFormData] = useState({
    deceasedName: '',
    dod: '',
    age: 0,
    gender: '',
    causeOfDeath: '',
    placeOfDeath: '',
    relativeName: '',
    relation: '',
    relativeAadhaar: ''
  });

  const handleInputChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      const requestId = await certificateService.submitDeathCertificate(
        user.id,
        formData,
        documents
      );

      alert(`Application submitted successfully! Request ID: ${requestId}\nPayment of ₹50 processed.`);
      navigate('/status');
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Death Certificate Application</h1>
              <p className="opacity-90">Please fill in all required information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Deceased Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deceased Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name of Deceased *
                </label>
                <input
                  type="text"
                  name="deceasedName"
                  required
                  value={formData.deceasedName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter full name of deceased"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Death *
                </label>
                <input
                  type="date"
                  name="dod"
                  required
                  value={formData.dod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age at Death *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Age in years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Death *
                </label>
                <input
                  type="text"
                  name="placeOfDeath"
                  required
                  value={formData.placeOfDeath}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Hospital/Home/City name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cause of Death *
                </label>
                <textarea
                  name="causeOfDeath"
                  required
                  rows={3}
                  value={formData.causeOfDeath}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Medical cause of death or circumstances"
                />
              </div>
            </div>
          </div>

          {/* Relative Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant (Relative) Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="relativeName"
                  required
                  value={formData.relativeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship with Deceased *
                </label>
                <select
                  name="relation"
                  required
                  value={formData.relation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select Relationship</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Aadhaar Number *
                </label>
                <input
                  type="text"
                  name="relativeAadhaar"
                  required
                  value={formData.relativeAadhaar}
                  onChange={handleInputChange}
                  pattern="[0-9]{12}"
                  maxLength={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your 12-digit Aadhaar number"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Required Documents *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div>
                  <label htmlFor="documents" className="cursor-pointer">
                    <span className="text-gray-600 hover:text-gray-500 font-medium">
                      Click to upload documents
                    </span>
                    <input
                      id="documents"
                      type="file"
                      multiple
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-2">
                    Upload medical certificate, your ID, police report (if applicable)
                  </p>
                  <p className="text-gray-400 text-xs">PDF, JPG, PNG up to 5MB each</p>
                </div>
              </div>
              {documents.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Files:</p>
                  <ul className="space-y-1">
                    {documents.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Payment Information</h3>
            </div>
            <div className="bg-white rounded-md p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Application Fee:</span>
                <span className="text-xl font-bold text-green-600">₹50</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Payment will be processed upon form submission
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/apply-certificate')}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Application & Pay ₹50'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeathCertificateForm;
