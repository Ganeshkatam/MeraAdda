const getDefaultBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const remote = process.env.NEXT_PUBLIC_API_URL;
    return remote ? `${remote.replace(/\/$/, '')}/api/v1` : '/api/v1';
  }

  const serverRemote = process.env.BACKEND_API_URL || process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (serverRemote) {
    return `${serverRemote.replace(/\/$/, '')}/api/v1`;
  }
  const port = parseInt(process.env.PORT, 10) || 5000;
  const host = process.env.HOST === '0.0.0.0' || !process.env.HOST ? '127.0.0.1' : process.env.HOST;
  return `http://${host}:${port}/api/v1`;
};

class ApiClient {
  constructor(baseUrl = getDefaultBaseUrl()) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.error?.message || `HTTP ${response.status}: Request failed`;
      const err = new Error(errorMsg);
      err.code = data?.error?.code || 'UNKNOWN_ERROR';
      err.status = response.status;
      err.details = data?.error?.details || null;
      throw err;
    }

    return data;
  }

  projects = {
    list: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'ALL') params.set('category', filters.category);
      if (filters.status) params.set('status', filters.status);
      if (filters.featured !== undefined) params.set('featured', String(filters.featured));
      if (filters.query) params.set('q', filters.query);

      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await this.request(`/projects${qs}`, { method: 'GET' });
      return res.data;
    },
    get: async (id) => {
      const res = await this.request(`/projects/${id}`, { method: 'GET' });
      return res.data;
    },
    create: async (payload) => {
      const res = await this.request('/projects', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return res.data;
    },
    update: async (id, payload) => {
      const res = await this.request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      return res.data;
    },
    delete: async (id) => {
      const res = await this.request(`/projects/${id}`, {
        method: 'DELETE'
      });
      return res.success;
    }
  };

  guestbook = {
    list: async (limit = 50) => {
      const res = await this.request(`/guestbook?limit=${limit}`, { method: 'GET' });
      return res.data;
    },
    create: async (payload) => {
      const res = await this.request('/guestbook', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return res.data;
    }
  };

  contact = {
    send: async (payload) => {
      const res = await this.request('/contact', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return res.data;
    }
  };

  profile = {
    get: async () => {
      const res = await this.request('/profile', { method: 'GET' });
      return res.data;
    },
    update: async (payload) => {
      const res = await this.request('/profile', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      return res.data;
    }
  };

  github = {
    getActivity: async (limit = 6) => {
      const res = await this.request(`/github/activity?limit=${limit}`, { method: 'GET' });
      return res.data;
    }
  };

  skills = {
    list: async (category) => {
      const qs = category ? `?category=${encodeURIComponent(category)}` : '';
      const res = await this.request(`/skills${qs}`, { method: 'GET' });
      return res.data;
    }
  };
}

export const apiClient = new ApiClient();
