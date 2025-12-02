import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { certificateService } from '../services/certificateService';
import {
  FileText,
  Users,
  UserCheck,
  BarChart,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Shield
} from 'lucide-react';

const SupervisorDashboard = () => {
  const { user } = useAuth();
  const [requests] = React.useState(() => certificateService.getAllRequests());
  const [users] = React.useState(() => JSON.parse(localStorage.getItem('users') || '[]'));
  const [officers] = React.useState(() => JSON.parse(localStorage.getItem('officers') || '[]'));
  const [grievances] = React.useState(() => JSON.parse(localStorage.getItem('grievances') || '[]'));

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;
  const pendingGrievances = grievances.filter(g => g.status === 'pending').length;

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.name} - Administrative Control Panel</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Requests" value={requests.length} icon={<FileText className="h-8 w-8 text-blue-500" />} color="blue" />
        <StatCard label="Registered Users" value={users.length} icon={<Users className="h-8 w-8 text-purple-500" />} color="purple" />
        <StatCard label="Active Officers" value={officers.length} icon={<UserCheck className="h-8 w-8 text-green-500" />} color="green" />
        <StatCard label="Pending Grievances" value={pendingGrievances} icon={<AlertCircle className="h-8 w-8 text-red-500" />} color="red" />
      </div>

      {/* Request Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <OverviewCard title="Pending Requests" count={pendingCount} color="yellow" icon={<Clock className="h-6 w-6 text-yellow-500" />} />
        <OverviewCard title="Approved Requests" count={approvedCount} color="green" icon={<CheckCircle className="h-6 w-6 text-green-500" />} />
        <OverviewCard title="Rejected Requests" count={rejectedCount} color="red" icon={<XCircle className="h-6 w-6 text-red-500" />} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ActionCard to="/manage-officers" icon={<UserCheck className="h-6 w-6 text-blue-600" />} color="blue" title="Manage Officers" description="Add/Remove officers" />
        <ActionCard to="/manage-users" icon={<Users className="h-6 w-6 text-purple-600" />} color="purple" title="Manage Users" description="User administration" />
        <ActionCard to="/reports" icon={<BarChart className="h-6 w-6 text-green-600" />} color="green" title="View Reports" description="Analytics and reports" />
        <ActionCard to="/manage-grievances" icon={<AlertCircle className="h-6 w-6 text-red-600" />} color="red" title="Manage Grievances" description="Handle user complaints" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recent Requests</h2>
          <Link to="/reports" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Detailed Report →
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h3>
            <p className="text-gray-600">No certificate requests to display.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Request ID</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Assigned Officer</TableHeader>
                  <TableHeader>Date</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <TableCell>{request.id}</TableCell>
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
                    <TableCell>{request.assignedOfficerId || 'Unassigned'}</TableCell>
                    <TableCell>{new Date(request.submissionDate).toLocaleDateString()}</TableCell>
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

const OverviewCard = ({ title, count, color, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {icon}
    </div>
    <p className={`text-3xl font-bold text-${color}-600`}>{count}</p>
    <p className="text-sm text-gray-500 mt-2">Status overview</p>
  </div>
);

const ActionCard = ({ to, icon, title, description, color }) => (
  <Link to={to} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
    <div className="flex items-center space-x-4">
      <div className={`bg-${color}-100 p-3 rounded-full group-hover:bg-${color}-200 transition-colors`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </Link>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>
);

export default SupervisorDashboard;
