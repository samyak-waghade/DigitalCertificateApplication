import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Heart, FileText, Clock, DollarSign } from 'lucide-react';

const ApplyCertificate = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Certificate</h1>
        <p className="text-xl text-gray-600">Choose the type of certificate you want to apply for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Birth Certificate */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Baby className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Birth Certificate</h2>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Apply for a birth certificate for newborns or children. Required for school admissions, 
              passport applications, and other official purposes.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">Required documents: Hospital records, Parent ID, Aadhaar</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">Processing time: 3-5 working days</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">Fee: ₹50</span>
              </div>
            </div>
            
            <Link
              to="/birth-certificate"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
            >
              Apply for Birth Certificate
            </Link>
          </div>
        </div>

        {/* Death Certificate */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Death Certificate</h2>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Apply for a death certificate for deceased family members. Required for insurance claims, 
              property transfers, and legal procedures.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Required documents: Medical certificate, Relative ID, Police report</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Processing time: 2-4 working days</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Fee: ₹50</span>
              </div>
            </div>
            
            <Link
              to="/death-certificate"
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium text-center block"
            >
              Apply for Death Certificate
            </Link>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-800">
          <li>All documents must be uploaded in PDF, JPG, or PNG format</li>
          <li>Maximum file size allowed is 5MB per document</li>
          <li>Ensure all information is accurate before submission</li>
          <li>Payment is required to process your application</li>
          <li>You will receive status updates via email and SMS</li>
        </ul>
      </div>
    </div>
  );
};

export default ApplyCertificate;
