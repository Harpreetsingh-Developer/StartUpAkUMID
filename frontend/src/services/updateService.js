import axios from '../utils/axiosconfigure';
import { API_BASE_URL } from '../config/api';

const updateService = {
  // Get all updates with optional search and pagination
  getAllUpdates: async (search = '', page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/updates`, {
        params: { search, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching updates:', error);
      throw error;
    }
  },

  // Get update by ID
  getUpdateById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/updates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching update:', error);
      throw error;
    }
  },

  // Create new update (GlobalAdmin only)
  createUpdate: async (updateData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/updates`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating update:', error);
      throw error;
    }
  },

  // Update existing update (GlobalAdmin only)
  updateUpdate: async (id, updateData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updates/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating update:', error);
      throw error;
    }
  },

  // Delete update (GlobalAdmin only)
  deleteUpdate: async (id, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/updates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting update:', error);
      throw error;
    }
  },

  // Toggle publish status (GlobalAdmin only)
  togglePublishStatus: async (id, token) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/updates/${id}/toggle-publish`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }
  }
};

export default updateService;
