import axios_client from '../utils/axiosconfigure.jsx';

class HolidayService {
  // Get today's holidays
  static async getTodayHolidays() {
    try {
      const response = await axios_client.get('/api/v1/holidays/today');
      return response.data;
    } catch (error) {
      console.error('Error fetching today\'s holidays:', error);
      throw error;
    }
  }

  // Get holidays for a specific date
  static async getHolidaysByDate(date) {
    try {
      const response = await axios_client.get(`/api/v1/holidays/date/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching holidays by date:', error);
      throw error;
    }
  }

  // Get all holidays (requires authentication)
  static async getAllHolidays() {
    try {
      const response = await axios_client.get('/api/v1/holidays');
      return response.data;
    } catch (error) {
      console.error('Error fetching all holidays:', error);
      throw error;
    }
  }

  // Get holidays grouped by month (public)
  static async getHolidaysByMonth() {
    try {
      const response = await axios_client.get('/api/v1/holidays/by-month');
      return response.data;
    } catch (error) {
      console.error('Error fetching holidays by month:', error);
      throw error;
    }
  }

  // Get national holidays grouped by month (public)
  static async getNationalHolidaysByMonth() {
    try {
      const response = await axios_client.get('/api/v1/holidays/national/by-month');
      return response.data;
    } catch (error) {
      console.error('Error fetching national holidays by month:', error);
      throw error;
    }
  }

  // Add a new holiday (requires authentication)
  static async addHoliday(holidayData) {
    try {
      const response = await axios_client.post('/api/v1/holidays', holidayData);
      return response.data;
    } catch (error) {
      console.error('Error adding holiday:', error);
      throw error;
    }
  }

  // Update a holiday (requires authentication)
  static async updateHoliday(id, holidayData) {
    try {
      const response = await axios_client.put(`/api/v1/holidays/${id}`, holidayData);
      return response.data;
    } catch (error) {
      console.error('Error updating holiday:', error);
      throw error;
    }
  }

  // Delete a holiday (requires authentication)
  static async deleteHoliday(id) {
    try {
      const response = await axios_client.delete(`/api/v1/holidays/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting holiday:', error);
      throw error;
    }
  }

  // Get upcoming holidays (next 30 days)
  static async getUpcomingHolidays() {
    try {
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      
      // Try to get national holidays by month first (public endpoint)
      const nationalHolidays = await this.getNationalHolidaysByMonth();
      
      if (nationalHolidays.success && nationalHolidays.data) {
        // Convert grouped data to flat array
        const flatHolidays = [];
        Object.values(nationalHolidays.data).forEach(monthHolidays => {
          flatHolidays.push(...monthHolidays);
        });
        
        const upcomingHolidays = flatHolidays.filter(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate >= today && holidayDate <= thirtyDaysFromNow;
        });
        
        return {
          success: true,
          data: upcomingHolidays.sort((a, b) => new Date(a.date) - new Date(b.date))
        };
      }
      
      // Fallback: return empty array if API fails
      return {
        success: true,
        data: []
      };
    } catch (error) {
      console.error('Error fetching upcoming holidays:', error);
      // Return empty array instead of throwing error
      return {
        success: true,
        data: []
      };
    }
  }

  // Check if today is a holiday
  static async isTodayHoliday() {
    try {
      const todayHolidays = await this.getTodayHolidays();
      return {
        isHoliday: todayHolidays.success && todayHolidays.data.length > 0,
        holidays: todayHolidays.data || []
      };
    } catch (error) {
      console.error('Error checking if today is holiday:', error);
      return {
        isHoliday: false,
        holidays: []
      };
    }
  }
}

export default HolidayService;
