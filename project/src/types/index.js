// User types and interfaces converted to JavaScript objects for reference

export const UserRoles = {
  USER: 'user',
  OFFICER: 'officer',
  SUPERVISOR: 'supervisor'
};

export const RequestStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const CertificateTypes = {
  BIRTH: 'birth',
  DEATH: 'death'
};

export const GrievanceStatus = {
  PENDING: 'pending',
  RESOLVED: 'resolved'
};

// Example data structures for reference
export const exampleUser = {
  id: '',
  name: '',
  phone: '',
  email: '',
  password: '',
  isVerified: false,
  createdAt: ''
};

export const exampleOfficer = {
  id: '',
  name: '',
  email: '',
  password: '',
  createdAt: '',
  createdBy: ''
};

export const exampleSupervisor = {
  id: '',
  name: '',
  email: '',
  password: ''
};

export const exampleCertificateRequest = {
  id: '',
  userId: '',
  type: '', // 'birth' or 'death'
  status: '', // 'pending', 'approved', 'rejected'
  submissionDate: '',
  assignedOfficerId: '',
  officerComment: '',
  approvalDate: '',
  documents: []
};