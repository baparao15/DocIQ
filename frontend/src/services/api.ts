import axios from 'axios';

const API_URL = `http://${window.location.hostname}:8000`;

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const analyzeDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/api/analyze-document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const analyzeText = async (text: string) => {
  const formData = new FormData();
  formData.append('text', text);
  
  const response = await api.post('/api/analyze-text', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get('/api/documents');
  return response.data;
};

export const getDocument = async (documentId: number) => {
  const response = await api.get(`/api/documents/${documentId}`);
  return response.data;
};

export const updateDocument = async (documentId: number, editedText: string) => {
  const response = await api.put(`/api/documents/${documentId}`, {
    edited_text: editedText
  });
  return response.data;
};
