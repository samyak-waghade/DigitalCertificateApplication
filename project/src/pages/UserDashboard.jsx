import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { certificateService } from '../services/certificateService';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Shield,
  HelpCircle,
  Info,
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = React.useState(() => {
    if (user) {
      return certificateService.getUserRequests(user.id);
    }
    return [];
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Your digital certificate dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Requests" value={requests.length} icon={<FileText className="h-8 w-8 text-blue-500" />} color="blue" />
        <StatCard label="Pending" value={pendingCount} icon={<Clock className="h-8 w-8 text-yellow-500" />} color="yellow" />
        <StatCard label="Approved" value={approvedCount} icon={<CheckCircle className="h-8 w-8 text-green-500" />} color="green" />
        <StatCard label="Rejected" value={rejectedCount} icon={<XCircle className="h-8 w-8 text-red-500" />} color="red" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ActionCard to="/apply-certificate" icon={<FileText className="h-6 w-6 text-blue-600" />} bg="blue" title="Apply for Certificate" desc="Birth or Death Certificate" />
        <ActionCard to="/status" icon={<Clock className="h-6 w-6 text-yellow-600" />} bg="yellow" title="Check Status" desc="Track your applications" />
        <ActionCard to="/download" icon={<Download className="h-6 w-6 text-green-600" />} bg="green" title="Download Certificate" desc="Get approved certificates" />
        <ActionCard to="/verify" icon={<Shield className="h-6 w-6 text-purple-600" />} bg="purple" title="Verify Document" desc="Check authenticity" />
        <ActionCard to="/help" icon={<HelpCircle className="h-6 w-6 text-orange-600" />} bg="orange" title="Help & Support" desc="Get assistance" />
        <ActionCard to="/about" icon={<Info className="h-6 w-6 text-gray-600" />} bg="gray" title="About Portal" desc="Learn more about us" />
      </div>

      {/* Recent Requests */}
      {requests.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Request ID</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Date</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.slice(0, 5).map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <TableCell bold>{request.id}</TableCell>
                    <TableCell>{request.type} Certificate</TableCell>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <TableCell>{new Date(request.submissionDate).toLocaleDateString()}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const ActionCard = ({ to, icon, title, desc, bg }) => (
  <Link to={to} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
    <div className="flex items-center space-x-4">
      <div className={`bg-${bg}-100 p-3 rounded-full group-hover:bg-${bg}-200 transition-colors`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  </Link>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children, bold }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm ${bold ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
    {children}
  </td>
);

export default UserDashboard;
