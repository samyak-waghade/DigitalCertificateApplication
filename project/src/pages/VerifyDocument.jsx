import React, { useState } from 'react';
import { Shield, Upload, CheckCircle, XCircle, FileText, AlertCircle } from 'lucide-react';

const VerifyDocument = () => {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleVerification = async () => {
    if (!document || !documentName) {
      alert('Please upload a document and enter the document name');
      return;
    }

    setLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% chance of being valid
      setVerificationResult({
        isValid,
        documentName,
        fileName: document.name,
        verificationDate: new Date().toISOString(),
        certificateId: isValid ? `CERT${Date.now()}` : null,
        message: isValid 
          ? 'This document is authentic and verified by our system.'
          : 'This document could not be verified. Please check if it was issued by our portal.'
      });
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setDocument(null);
    setDocumentName('');
    setVerificationResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="mx-auto h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Verification</h1>
        <p className="text-gray-600">Verify the authenticity of your digital certificates</p>
      </div>

      {!verificationResult ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div>
                  <label htmlFor="document" className="cursor-pointer">
                    <span className="text-purple-600 hover:text-purple-500 font-medium">
                      Click to upload document
                    </span>
                    <input
                      id="document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-2">
                    Upload the certificate you want to verify
                  </p>
                  <p className="text-gray-400 text-xs">PDF, JPG, PNG up to 5MB</p>
                </div>
              </div>
              {document && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{document.name} ({(document.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* Document Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Name *
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the name/title of the document"
              />
            </div>

            {/* Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">How Verification Works</h4>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>• Upload the digital certificate you want to verify</li>
                    <li>• Our system checks against our secure database</li>
                    <li>• Verification confirms authenticity and validity</li>
                    <li>• Only documents issued through our portal can be verified</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerification}
              disabled={!document || !documentName || loading}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Verifying Document...' : 'Verify Document'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Result Header */}
          <div className={`p-6 ${verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-center space-x-3">
              {verificationResult.isValid ? (
                <CheckCircle className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${
                  verificationResult.isValid ? 'text-green-900' : 'text-red-900'
                }`}>
                  {verificationResult.isValid ? 'Document Verified' : 'Verification Failed'}
                </h3>
                <p className={`${
                  verificationResult.isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.message}
                </p>
              </div>
            </div>
          </div>

          {/* Result Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Document Name</label>
                <p className="text-gray-900">{verificationResult.documentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">File Name</label>
                <p className="text-gray-900">{verificationResult.fileName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Verification Date</label>
                <p className="text-gray-900">
                  {new Date(verificationResult.verificationDate).toLocaleString()}
                </p>
              </div>
              {verificationResult.certificateId && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Certificate ID</label>
                  <p className="text-gray-900 font-mono">{verificationResult.certificateId}</p>
                </div>
              )}
            </div>

            {verificationResult.isValid && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">Verification Details</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>✓ Document authenticity confirmed</li>
                  <li>✓ Digital signature valid</li>
                  <li>✓ Issued by authorized government portal</li>
                  <li>✓ No tampering detected</li>
                </ul>
              </div>
            )}

            {!verificationResult.isValid && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-red-800 mb-2">Possible Reasons</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Document not issued through our portal</li>
                  <li>• Document may have been tampered with</li>
                  <li>• Invalid or corrupted file format</li>
                  <li>• Document name doesn't match our records</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <button
              onClick={handleReset}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Verify Another Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyDocument;