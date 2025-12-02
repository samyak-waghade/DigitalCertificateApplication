import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const ViewReports = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Get data from localStorage
  const requests = JSON.parse(localStorage.getItem('certificate_requests') || '[]');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const officers = JSON.parse(localStorage.getItem('officers') || '[]');
  const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
  const payments = JSON.parse(localStorage.getItem('payments') || '[]');

  // Calculate statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const approvedRequests = requests.filter(r => r.status === 'approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'rejected').length;
  
  const birthCertificates = requests.filter(r => r.type === 'birth').length;
  const deathCertificates = requests.filter(r => r.type === 'death').length;
  
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  
  const verifiedUsers = users.filter(u => u.isVerified).length;
  const pendingGrievances = grievances.filter(g => g.status === 'pending').length;
  const resolvedGrievances = grievances.filter(g => g.status === 'resolved').length;

  // Calculate approval rate
  const approvalRate = totalRequests > 0 ? ((approvedRequests / totalRequests) * 100).toFixed(1) : 0;

  // Get period-based data
  const getPeriodData = (period) => {
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }
    
    return requests.filter(r => new Date(r.submissionDate) >= startDate);
  };

  const periodRequests = getPeriodData(selectedPeriod);

  // Processing time analysis
  const getAverageProcessingTime = () => {
    const processedRequests = requests.filter(r => r.approvalDate);
    if (processedRequests.length === 0) return 0;
    
    const totalTime = processedRequests.reduce((sum, request) => {
      const submitted = new Date(request.submissionDate);
      const approved = new Date(request.approvalDate);
      return sum + (approved - submitted);
    }, 0);
    
    return Math.round(totalTime / processedRequests.length / (1000 * 60 * 60 * 24));
  };

  const averageProcessingTime = getAverageProcessingTime();

  const handleExportReport = () => {
    const reportData = {
      generatedBy: user?.name,
      generatedAt: new Date().toISOString(),
      period: selectedPeriod,
      statistics: {
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        approvalRate,
        averageProcessingTime,
        totalRevenue,
        totalUsers: users.length,
        verifiedUsers,
        totalOfficers: officers.length,
        totalGrievances: grievances.length,
        pendingGrievances,
        resolvedGrievances
      },
      certificateBreakdown: {
        birthCertificates,
        deathCertificates
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_report_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Reports</h1>
            <p className="text-gray-600">Comprehensive analytics and performance metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <button
              onClick={handleExportReport}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
              <p className="text-sm text-gray-500 mt-1">
                {periodRequests.length} in {selectedPeriod}
              </p>
            </div>
            <FileText className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approval Rate</p>
              <p className="text-3xl font-bold text-green-600">{approvalRate}%</p>
              <p className="text-sm text-gray-500 mt-1">
                {approvedRequests} approved
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Processing</p>
              <p className="text-3xl font-bold text-purple-600">{averageProcessingTime}</p>
              <p className="text-sm text-gray-500 mt-1">days</p>
            </div>
            <Calendar className="h-10 w-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-emerald-600">₹{totalRevenue}</p>
              <p className="text-sm text-gray-500 mt-1">
                {completedPayments} payments
              </p>
            </div>
            <BarChart className="h-10 w-10 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Request Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Request Status Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-yellow-600">{pendingRequests}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${totalRequests > 0 ? (pendingRequests / totalRequests) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-medium text-green-600">{approvedRequests}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${totalRequests > 0 ? (approvedRequests / totalRequests) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Rejected</span>
                <span className="text-sm font-medium text-red-600">{rejectedRequests}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${totalRequests > 0 ? (rejectedRequests / totalRequests) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificate Types</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Birth Certificates</span>
                <span className="text-sm font-medium text-blue-600">{birthCertificates}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${totalRequests > 0 ? (birthCertificates / totalRequests) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Death Certificates</span>
                <span className="text-sm font-medium text-gray-600">{deathCertificates}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: `${totalRequests > 0 ? (deathCertificates / totalRequests) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-medium">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Verified Users</span>
              <span className="font-medium text-green-600">{verifiedUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unverified</span>
              <span className="font-medium text-red-600">{users.length - verifiedUsers}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Officers</span>
              <span className="font-medium">{officers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Officers</span>
              <span className="font-medium text-green-600">{officers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Supervisors</span>
              <span className="font-medium">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grievances</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Grievances</span>
              <span className="font-medium">{grievances.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-yellow-600">{pendingGrievances}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resolved</span>
              <span className="font-medium text-green-600">{resolvedGrievances}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
        </div>
        
        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600">No certificate requests have been submitted yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Processing Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.slice(0, 10).map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {request.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.approvalDate 
                        ? `${Math.ceil((new Date(request.approvalDate) - new Date(request.submissionDate)) / (1000 * 60 * 60 * 24))} days`
                        : 'Processing'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports;