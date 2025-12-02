import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { certificateService } from '../services/certificateService';
import { Download, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const DownloadCertificate = () => {
  const { user } = useAuth();
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      if (user) {
        const allRequests = await certificateService.getUserRequests(user.id);
        const approved = allRequests.filter(r => r.status === 'approved');
        setApprovedRequests(approved);
      }
    };
    fetchApproved();
  }, [user]);

  const handleDownload = (request) => {
    const certificateData = {
      requestId: request.id,
      type: request.type,
      approvalDate: request.approvalDate,
      userName: user.name,
      issuedBy: 'Government Digital Certificate Portal'
    };

    const content = `
GOVERNMENT DIGITAL CERTIFICATE

${request.type.toUpperCase()} CERTIFICATE

Request ID: ${request.id}
Issued To: ${user.name}
Approval Date: ${new Date(request.approvalDate).toLocaleDateString()}
Issued By: Government Digital Certificate Portal

This is a digitally generated certificate.
For verification, visit our portal and use the document verification feature.

Certificate ID: CERT${request.id}${Date.now()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${request.type}_certificate_${request.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('Certificate downloaded successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Download Certificates</h1>
        <p className="text-gray-600">Download your approved digital certificates</p>
      </div>

      {approvedRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Approved Certificates</h3>
          <p className="text-gray-600 mb-6">
            You don't have any approved certificates available for download yet.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Certificates become available for download after they are approved by our officers.</p>
            <p>Check your application status or submit a new certificate request.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {approvedRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {request.type} Certificate
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <span>Request ID:</span>
                          <span className="font-mono">{request.id}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Approved: {new Date(request.approvalDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Approved</span>
                    </div>
                    <button
                      onClick={() => handleDownload(request)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-500">Submission Date</label>
                      <p className="text-gray-900">{new Date(request.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-500">Processing Time</label>
                      <p className="text-gray-900">
                        {Math.ceil((new Date(request.approvalDate) - new Date(request.submissionDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-500">Assigned Officer</label>
                      <p className="text-gray-900">{request.assignedOfficerId || 'N/A'}</p>
                    </div>
                  </div>

                  {request.officerComment && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <label className="font-medium text-blue-800 text-sm">Officer Comment</label>
                      <p className="text-blue-700 text-sm mt-1">{request.officerComment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Download Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ul className="space-y-1">
                  <li>• Certificates are downloaded in plain text (demo)</li>
                  <li>• Keep your certificates safe and secure</li>
                  <li>• You can download certificates multiple times</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Usage Guidelines:</h4>
                <ul className="space-y-1">
                  <li>• Use certificates for official purposes only</li>
                  <li>• Verify authenticity using our verification tool</li>
                  <li>• Contact support if you face any issues</li>
                  <li>• You may print it for physical use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadCertificate;
