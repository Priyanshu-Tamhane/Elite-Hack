const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  // Auth
  async login(email: string, password: string, role: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async register(name: string, email: string, password: string, role: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  // User
  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Events
  async getEvents() {
    return this.request('/events');
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`);
  }

  async getEventBySlug(slug: string) {
    return this.request(`/events/slug/${slug}`);
  }

  async createEvent(eventData: any) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id: string, eventData: any) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async updateEventBySlug(slug: string, eventData: any) {
    return this.request(`/events/slug/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Registrations
  async getRegistrations(slug: string) {
    return this.request(`/events/${slug}/registrations`);
  }

  async createRegistration(slug: string, registrationData: any) {
    return this.request(`/events/${slug}/registrations`, {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  }

  async deleteRegistration(slug: string, id: string) {
    return this.request(`/events/${slug}/registrations/${id}`, {
      method: 'DELETE',
    });
  }

  async updateRegistrationStatus(slug: string, id: string, status: string) {
    return this.request(`/events/${slug}/registrations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Room Assignments
  async getRoomAssignments(slug: string) {
    return this.request(`/events/${slug}/room-assignments`);
  }

  async createRoomAssignment(slug: string, assignmentData: any) {
    return this.request(`/events/${slug}/room-assignments`, {
      method: 'POST',
      body: JSON.stringify(assignmentData),
    });
  }

  async deleteRoomAssignment(slug: string, guestId: string) {
    return this.request(`/events/${slug}/room-assignments/${guestId}`, {
      method: 'DELETE',
    });
  }

  // Notifications
  async getNotifications(slug: string) {
    return this.request(`/events/${slug}/notifications`);
  }

  async createNotification(slug: string, notificationData: any) {
    return this.request(`/events/${slug}/notifications`, {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  }

  // Teams
  async getTeamsByEvent(eventId: string) {
    return this.request(`/teams/event/${eventId}`);
  }

  async createTeam(teamData: any) {
    return this.request('/teams', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async joinTeam(teamId: string) {
    return this.request(`/teams/${teamId}/join`, {
      method: 'POST',
    });
  }

  // Payments
  async getPayments() {
    return this.request('/payments');
  }

  async getPaymentsByEvent(eventId: string) {
    return this.request(`/payments/event/${eventId}`);
  }

  async getPaymentStats() {
    return this.request('/payments/stats');
  }

  async refundPayment(paymentId: string) {
    return this.request(`/payments/${paymentId}/refund`, {
      method: 'PATCH',
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async getNotification(id: string) {
    return this.request(`/notifications/${id}`);
  }

  async createNotification(data: any) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNotification(id: string, data: any) {
    return this.request(`/notifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNotification(id: string) {
    return this.request(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }

  // AI Assistant
  async sendAIMessage(message: string, eventData: any) {
    return this.request('/ai-assistant', {
      method: 'POST',
      body: JSON.stringify({ message, eventData }),
    });
  }
}

export const api = new ApiService();
