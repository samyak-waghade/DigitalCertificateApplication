class AuthService {
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  initializeDefaultData() {
    // Initialize default supervisor if not exists
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    if (supervisors.length === 0) {
      const defaultSupervisor = {
        id: this.generateId(),
        name: 'Admin Supervisor',
        email: 'supervisor@gov.in',
        password: 'admin123'
      };
      localStorage.setItem('supervisors', JSON.stringify([defaultSupervisor]));
    }

    // Initialize default officer if not exists
    const officers = JSON.parse(localStorage.getItem('officers') || '[]');
    if (officers.length === 0) {
      const defaultOfficer = {
        id: 'OFF001',
        name: 'John Officer',
        email: 'officer@gov.in',
        password: 'officer123',
        createdAt: new Date().toISOString(),
        createdBy: supervisors[0]?.id || 'system'
      };
      localStorage.setItem('officers', JSON.stringify([defaultOfficer]));
    }
  }

  async login(email, password, role) {
    this.initializeDefaultData();

    let userData = null;

    if (role === 'user') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user && user.isVerified) {
        userData = { id: user.id, name: user.name, email: user.email, role: 'user' };
      }
    } else if (role === 'officer') {
      const officers = JSON.parse(localStorage.getItem('officers') || '[]');
      const officer = officers.find(o => (o.id === email || o.email === email) && o.password === password);
      if (officer) {
        userData = { id: officer.id, name: officer.name, email: officer.email, role: 'officer' };
      }
    } else if (role === 'supervisor') {
      const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
      const supervisor = supervisors.find(s => s.email === email && s.password === password);
      if (supervisor) {
        userData = { id: supervisor.id, name: supervisor.name, email: supervisor.email, role: 'supervisor' };
      }
    }

    if (userData) {
      const token = btoa(JSON.stringify(userData));
      localStorage.setItem('auth_token', token);
      return userData;
    }

    return null;
  }

  async register(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      ...userData,
      id: this.generateId(),
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Generate OTP (simulate)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`otp_${newUser.email}`, otp);
    
    return otp; // In real app, this would be sent via email
  }

  async verifyOTP(email, otp) {
    const storedOTP = localStorage.getItem(`otp_${email}`);
    if (storedOTP === otp) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.email === email);
      if (userIndex !== -1) {
        users[userIndex].isVerified = true;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem(`otp_${email}`);
        return true;
      }
    }
    return false;
  }

  getCurrentUser() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        return JSON.parse(atob(token));
      } catch {
        return null;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}

export const authService = new AuthService();










