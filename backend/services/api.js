// API service for frontend-backend communication
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  getProfile: (token) => apiCall('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Institutions API
export const institutionsAPI = {
  getAll: () => apiCall('/institutions'),
  getById: (id) => apiCall(`/institutions/${id}`),
  create: (institutionData, token) => apiCall('/institutions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(institutionData),
  }),
};

// Students API
export const studentsAPI = {
  getProfile: (id, token) => apiCall(`/students/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  updateProfile: (id, data, token) => apiCall(`/students/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  getApplications: (id, token) => apiCall(`/students/${id}/applications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Companies API
export const companiesAPI = {
  getAll: () => apiCall('/companies'),
  updateStatus: (id, status, token) => apiCall(`/companies/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }),
};

// Jobs API
export const jobsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/jobs?${params}`);
  },
  apply: (jobId, studentId, token) => apiCall(`/jobs/${jobId}/apply`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ studentId }),
  }),
};

// Applications API
export const applicationsAPI = {
  submit: (applicationData, token) => apiCall('/applications', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(applicationData),
  }),
  updateStatus: (id, status, token) => apiCall(`/applications/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }),
};

// Admin API
export const adminAPI = {
  getOverview: (token) => apiCall('/admin/overview', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

export default {
  auth: authAPI,
  institutions: institutionsAPI,
  students: studentsAPI,
  companies: companiesAPI,
  jobs: jobsAPI,
  applications: applicationsAPI,
  admin: adminAPI,
};