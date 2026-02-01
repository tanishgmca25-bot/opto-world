// API Service for connecting to backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth API calls
export const authAPI = {
  signup: async (name, email, password, confirmPassword) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  adminSignup: async (name, email, password, confirmPassword) => {
    const response = await fetch(`${API_URL}/auth/admin-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });
    return response.json();
  },

  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};

// Product API calls
export const productAPI = {
  getAll: async (query = '') => {
    const response = await fetch(`${API_URL}/products${query}`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  create: async (productData, imageFile) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('brand', productData.brand);
    formData.append('price', productData.price);
    formData.append('originalPrice', productData.originalPrice);
    formData.append('category', productData.category);
    formData.append('frameType', productData.frameType);
    formData.append('color', productData.color);
    formData.append('material', productData.material);
    formData.append('description', productData.description);
    formData.append('features', productData.features);
    formData.append('inStock', productData.inStock);
    formData.append('stock', productData.stock || 0);
    if (imageFile) formData.append('image', imageFile);

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    });
    return response.json();
  },

  update: async (id, productData, imageFile) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('brand', productData.brand);
    formData.append('price', productData.price);
    formData.append('originalPrice', productData.originalPrice);
    formData.append('category', productData.category);
    formData.append('frameType', productData.frameType);
    formData.append('color', productData.color);
    formData.append('material', productData.material);
    formData.append('description', productData.description);
    formData.append('features', productData.features);
    formData.append('inStock', productData.inStock);
    formData.append('stock', productData.stock || 0);
    if (imageFile) formData.append('image', imageFile);

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};

// Review API calls
export const reviewAPI = {
  getAll: async (productId) => {
    const query = productId ? `?productId=${productId}` : '';
    const response = await fetch(`${API_URL}/reviews${query}`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}`);
    return response.json();
  },

  create: async (productId, rating, comment) => {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId, rating, comment })
    });
    return response.json();
  },

  update: async (id, rating, comment) => {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ rating, comment })
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  markHelpful: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}/helpful`, {
      method: 'PUT'
    });
    return response.json();
  }
};

// Booking API calls
export const bookingAPI = {
  create: async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};

// Contact API calls
export const contactAPI = {
  create: async (contactData) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/contacts`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};

// Cart API calls
export const cartAPI = {
  getCart: async () => {
    const response = await fetch(`${API_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  },

  updateItem: async (productId, quantity) => {
    const response = await fetch(`${API_URL}/cart/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ quantity })
    });
    return response.json();
  },

  removeItem: async (productId) => {
    const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  clearCart: async () => {
    const response = await fetch(`${API_URL}/cart/clear`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};


