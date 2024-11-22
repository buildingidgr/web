const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

export async function login(email: string): Promise<string> {
  const response = await fetch('/api/auth/get-token', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${email}` // Using email as a mock Clerk session token
    }
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.token;
}

export async function createProject(projectData: any): Promise<any> {
  return fetchWithAuth('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
}

export async function getProject(id: string): Promise<any> {
  return fetchWithAuth(`/projects/${id}`);
}

