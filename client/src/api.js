const API_BASE_URL = 'http://localhost:5000/api';
export const USE_MOCK_BACKEND = false; // We are connecting to the real server now

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = (data && (data.msg || data)) || response.statusText;
    throw new Error(error);
  }
  return data;
}

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  addExpense: async (token, expenseData) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, { // Assuming this is the correct endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token, // Standard practice to send token in headers
      },
      body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
  },

  updateExpense: async (token, expenseId, expenseData) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
  },

  getExpenses: async (token) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return handleResponse(response);
  },

  deleteExpense: async (token, expenseId) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
      },
    });
    return handleResponse(response);
  },


};