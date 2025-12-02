class CertificateService {
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async submitBirthCertificate(userId, data, documents) {
    const requests = JSON.parse(localStorage.getItem('certificate_requests') || '[]');
    
    const documentUploads = documents.map(file => ({
      id: this.generateId(),
      name: file.name,
      type: file.type,
      verified: false
    }));

    const request = {
      id: this.generateId(),
      userId,
      type: 'birth',
      status: 'pending',
      submissionDate: new Date().toISOString(),
      documents: documentUploads
    };

    requests.push(request);
    localStorage.setItem('certificate_requests', JSON.stringify(requests));

    // Store birth certificate data
    const birthCertificates = JSON.parse(localStorage.getItem('birth_certificates') || '[]');
    birthCertificates.push({ ...data, requestId: request.id });
    localStorage.setItem('birth_certificates', JSON.stringify(birthCertificates));

    // Create payment record
    const payment = {
      id: this.generateId(),
      requestId: request.id,
      amount: 50, // ₹50 for birth certificate
      status: 'completed',
      transactionId: `TXN${Date.now()}`,
      paymentDate: new Date().toISOString()
    };

    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));

    return request.id;
  }

  async submitDeathCertificate(userId, data, documents) {
    const requests = JSON.parse(localStorage.getItem('certificate_requests') || '[]');
    
    const documentUploads = documents.map(file => ({
      id: this.generateId(),
      name: file.name,
      type: file.type,
      verified: false
    }));

    const request = {
      id: this.generateId(),
      userId,
      type: 'death',
      status: 'pending',
      submissionDate: new Date().toISOString(),
      documents: documentUploads
    };

    requests.push(request);
    localStorage.setItem('certificate_requests', JSON.stringify(requests));

    // Store death certificate data
    const deathCertificates = JSON.parse(localStorage.getItem('death_certificates') || '[]');
    deathCertificates.push({ ...data, requestId: request.id });
    localStorage.setItem('death_certificates', JSON.stringify(deathCertificates));

    // Create payment record
    const payment = {
      id: this.generateId(),
      requestId: request.id,
      amount: 50, // ₹50 for death certificate
      status: 'completed',
      transactionId: `TXN${Date.now()}`,
      paymentDate: new Date().toISOString()
    };

    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));

    return request.id;
  }

  getUserRequests(userId) {
    const requests = JSON.parse(localStorage.getItem('certificate_requests') || '[]');
    return requests.filter(r => r.userId === userId);
  }

  getAllRequests() {
    return JSON.parse(localStorage.getItem('certificate_requests') || '[]');
  }

  updateRequestStatus(requestId, status, comment, officerId) {
    const requests = JSON.parse(localStorage.getItem('certificate_requests') || '[]');
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex !== -1) {
      requests[requestIndex].status = status;
      requests[requestIndex].officerComment = comment;
      requests[requestIndex].assignedOfficerId = officerId;
      if (status === 'approved') {
        requests[requestIndex].approvalDate = new Date().toISOString();
      }
      localStorage.setItem('certificate_requests', JSON.stringify(requests));
      return true;
    }
    return false;
  }

  verifyDocument(documentId) {
    // In a real app, this would involve document verification logic
    return Math.random() > 0.3; // 70% chance of verification success
  }
}

export const certificateService = new CertificateService();