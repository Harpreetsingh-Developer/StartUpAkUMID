import axios from '../utils/axiosconfigure';

const pollService = {
  getAllPolls: async (search = '', page = 1, limit = 10, status = '') => {
    try {
      const response = await axios.get(
        `/api/v1/polls?search=${search}&page=${page}&limit=${limit}&status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }
  },

  createPoll: async (pollData, token) => {
    try {
      const response = await axios.post(
        '/api/v1/polls',
        pollData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating poll:", error);
      throw error;
    }
  },

  getPollById: async (id) => {
    try {
      const response = await axios.get(`/api/v1/polls/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching poll by ID:", error);
      throw error;
    }
  },

  updatePoll: async (id, pollData, token) => {
    try {
      const response = await axios.put(
        `/api/v1/polls/${id}`,
        pollData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating poll:", error);
      throw error;
    }
  },

  deletePoll: async (id, token) => {
    try {
      const response = await axios.delete(`/api/v1/polls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting poll:", error);
      throw error;
    }
  },

  voteOnPoll: async (id, optionId) => {
    try {
      const response = await axios.post(
        `/api/v1/polls/${id}/vote/${optionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error voting on poll:", error);
      throw error;
    }
  },
};

export default pollService;
