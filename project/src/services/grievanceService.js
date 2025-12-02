class GrievanceService {
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  submitGrievance(userId, description) {
    const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
    
    const newGrievance = {
      id: this.generateId(),
      userId,
      description,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    grievances.push(newGrievance);
    localStorage.setItem('grievances', JSON.stringify(grievances));
    
    return newGrievance.id;
  }

  getUserGrievances(userId) {
    const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
    return grievances.filter(g => g.userId === userId);
  }

  getAllGrievances() {
    return JSON.parse(localStorage.getItem('grievances') || '[]');
  }

  updateGrievanceStatus(grievanceId, status, response, supervisorId) {
    const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
    const grievanceIndex = grievances.findIndex(g => g.id === grievanceId);
    
    if (grievanceIndex !== -1) {
      grievances[grievanceIndex].status = status;
      grievances[grievanceIndex].response = response;
      grievances[grievanceIndex].supervisorId = supervisorId;
      grievances[grievanceIndex].resolvedAt = new Date().toISOString();
      localStorage.setItem('grievances', JSON.stringify(grievances));
      return true;
    }
    return false;
  }
}

export const grievanceService = new GrievanceService();