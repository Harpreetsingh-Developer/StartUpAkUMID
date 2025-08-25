import React, { useState, useEffect } from 'react';
import HolidayService from '../../../../services/holidayService.js';
import './DashboardHoliday.scss';

const DashboardHoliday = () => {
  const [allHolidays, setAllHolidays] = useState([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllHolidays, setShowAllHolidays] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        
        // Mock data - always use this for now to ensure it works
        const mockHolidays = [
          {
            _id: '1',
            name: 'Republic Day',
            date: '2025-01-26',
            description: 'Celebration of the adoption of the Constitution of India'
          },
          {
            _id: '2',
            name: 'Maha Shivratri',
            date: '2025-02-26',
            description: 'Hindu festival dedicated to Lord Shiva'
          },
          {
            _id: '3',
            name: 'Holi',
            date: '2025-03-14',
            description: 'Festival of colors celebrating spring and love'
          },
          {
            _id: '4',
            name: 'Id-ul-Fitr',
            date: '2025-03-31',
            description: 'Islamic festival marking the end of Ramadan'
          },
          {
            _id: '5',
            name: 'Mahavir Jayanti',
            date: '2025-04-10',
            description: 'Jain festival celebrating the birth of Lord Mahavira'
          },
          {
            _id: '6',
            name: 'Good Friday',
            date: '2025-04-18',
            description: 'Christian observance of the crucifixion of Jesus Christ'
          },
          {
            _id: '7',
            name: 'Buddha Purnima',
            date: '2025-05-12',
            description: 'Buddhist festival celebrating the birth, enlightenment, and death of Buddha'
          },
          {
            _id: '8',
            name: 'Id-ul-Zuha (Bakrid)',
            date: '2025-06-07',
            description: 'Islamic festival of sacrifice'
          },
          {
            _id: '9',
            name: 'Muharram',
            date: '2025-07-06',
            description: 'Islamic day of mourning and remembrance'
          },
          {
            _id: '10',
            name: 'Raksha Bandhan',
            date: '2025-08-09',
            description: 'Hindu festival celebrating the bond between brothers and sisters'
          },
          {
            _id: '11',
            name: 'Independence Day',
            date: '2025-08-15',
            description: 'Celebration of India\'s independence from British rule'
          },
          {
            _id: '12',
            name: 'Janmashtami',
            date: '2025-08-16',
            description: 'Hindu festival celebrating the birth of Lord Krishna'
          },
          {
            _id: '13',
            name: 'Ganesh Chaturthi',
            date: '2025-08-27',
            description: 'Hindu festival celebrating the birth of Lord Ganesha'
          },
          {
            _id: '14',
            name: 'Milad-un-Nabi (Id-e-Milad)',
            date: '2025-09-05',
            description: 'Islamic celebration of the birth of Prophet Muhammad'
          },
          {
            _id: '15',
            name: 'Gandhi Jayanti',
            date: '2025-10-02',
            description: 'Birth anniversary of Mahatma Gandhi'
          },
          {
            _id: '16',
            name: 'Dussehra',
            date: '2025-10-02',
            description: 'Hindu festival celebrating the victory of good over evil'
          },
          {
            _id: '17',
            name: 'Diwali (Deepavali)',
            date: '2025-10-20',
            description: 'Festival of lights celebrating the victory of light over darkness'
          },
          {
            _id: '18',
            name: 'Guru Nanak\'s Birthday',
            date: '2025-11-05',
            description: 'Sikh celebration of the birth of Guru Nanak Dev Ji'
          },
          {
            _id: '19',
            name: 'Christmas Day',
            date: '2025-12-25',
            description: 'Celebration of the birth of Jesus Christ'
          }
        ];
        
        // Set all holidays
        setAllHolidays(mockHolidays);
        
        // Filter upcoming holidays
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        
        const upcoming = mockHolidays.filter(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate >= today && holidayDate <= thirtyDaysFromNow;
        });
        
        setUpcomingHolidays(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));
        
      } catch (err) {
        console.error('Error in fetchHolidays:', err);
        // Use mock data as fallback
        const mockHolidays = [
          {
            _id: '1',
            name: 'Republic Day',
            date: '2025-01-26',
            description: 'Celebration of the adoption of the Constitution of India'
          },
          {
            _id: '2',
            name: 'Maha Shivratri',
            date: '2025-02-26',
            description: 'Hindu festival dedicated to Lord Shiva'
          },
          {
            _id: '3',
            name: 'Holi',
            date: '2025-03-14',
            description: 'Festival of colors celebrating spring and love'
          },
          {
            _id: '4',
            name: 'Id-ul-Fitr',
            date: '2025-03-31',
            description: 'Islamic festival marking the end of Ramadan'
          },
          {
            _id: '5',
            name: 'Mahavir Jayanti',
            date: '2025-04-10',
            description: 'Jain festival celebrating the birth of Lord Mahavira'
          },
          {
            _id: '6',
            name: 'Good Friday',
            date: '2025-04-18',
            description: 'Christian observance of the crucifixion of Jesus Christ'
          },
          {
            _id: '7',
            name: 'Buddha Purnima',
            date: '2025-05-12',
            description: 'Buddhist festival celebrating the birth, enlightenment, and death of Buddha'
          },
          {
            _id: '8',
            name: 'Id-ul-Zuha (Bakrid)',
            date: '2025-06-07',
            description: 'Islamic festival of sacrifice'
          },
          {
            _id: '9',
            name: 'Muharram',
            date: '2025-07-06',
            description: 'Islamic day of mourning and remembrance'
          },
          {
            _id: '10',
            name: 'Raksha Bandhan',
            date: '2025-08-09',
            description: 'Hindu festival celebrating the bond between brothers and sisters'
          },
          {
            _id: '11',
            name: 'Independence Day',
            date: '2025-08-15',
            description: 'Celebration of India\'s independence from British rule'
          },
          {
            _id: '12',
            name: 'Janmashtami',
            date: '2025-08-16',
            description: 'Hindu festival celebrating the birth of Lord Krishna'
          },
          {
            _id: '13',
            name: 'Ganesh Chaturthi',
            date: '2025-08-27',
            description: 'Hindu festival celebrating the birth of Lord Ganesha'
          },
          {
            _id: '14',
            name: 'Milad-un-Nabi (Id-e-Milad)',
            date: '2025-09-05',
            description: 'Islamic celebration of the birth of Prophet Muhammad'
          },
          {
            _id: '15',
            name: 'Gandhi Jayanti',
            date: '2025-10-02',
            description: 'Birth anniversary of Mahatma Gandhi'
          },
          {
            _id: '16',
            name: 'Dussehra',
            date: '2025-10-02',
            description: 'Hindu festival celebrating the victory of good over evil'
          },
          {
            _id: '17',
            name: 'Diwali (Deepavali)',
            date: '2025-10-20',
            description: 'Festival of lights celebrating the victory of light over darkness'
          },
          {
            _id: '18',
            name: 'Guru Nanak\'s Birthday',
            date: '2025-11-05',
            description: 'Sikh celebration of the birth of Guru Nanak Dev Ji'
          },
          {
            _id: '19',
            name: 'Christmas Day',
            date: '2025-12-25',
            description: 'Celebration of the birth of Jesus Christ'
          }
        ];
        
        setAllHolidays(mockHolidays);
        
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        
        const upcoming = mockHolidays.filter(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate >= today && holidayDate <= thirtyDaysFromNow;
        });
        
        setUpcomingHolidays(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatDateWithDay = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateFormatted = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
    return `${dayName}, ${dateFormatted}`;
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const holidayDate = new Date(dateString);
    const diffTime = holidayDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const groupHolidaysByMonth = (holidays) => {
    const grouped = {};
    holidays.forEach(holiday => {
      const date = new Date(holiday.date);
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(holiday);
    });
    return grouped;
  };

  const renderUpcomingHolidays = () => {
    return (
      <>
        <ul className="upcoming-holidays-list">
          {upcomingHolidays.slice(0, 5).map((holiday, index) => {
            const daysUntil = getDaysUntil(holiday.date);
            return (
              <li key={holiday._id || index} className="upcoming-holiday-item">
                <div className="holiday-info">
                  <span className="holiday-name">{holiday.name}</span>
                  <span className="holiday-date">{formatDateWithDay(holiday.date)}</span>
                </div>
                <div className="holiday-meta">
                  <span className="days-until">
                    {daysUntil === 0 ? 'Today' : 
                     daysUntil === 1 ? 'Tomorrow' : 
                     `${daysUntil} days`}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        {allHolidays.length > 0 && (
          <div className="view-all-section">
            <button 
              className="view-all-button"
              onClick={toggleView}
              disabled={loading}
            >
              View All Holidays ({allHolidays.length})
            </button>
          </div>
        )}
      </>
    );
  };

  const renderAllHolidaysByMonth = () => {
    const groupedHolidays = groupHolidaysByMonth(allHolidays);
    const months = Object.keys(groupedHolidays).sort((a, b) => {
      const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });

    return (
      <>
        <div className="view-upcoming-section">
          <button 
            className="view-upcoming-button"
            onClick={toggleView}
            disabled={loading}
          >
            ← Back to Upcoming Holidays
          </button>
        </div>
        {months.map(month => (
      <div key={month} className="month-group">
        <h4 className="month-title">{month}</h4>
        <ul className="holiday-list">
          {groupedHolidays[month].map((holiday, index) => (
                         <li key={holiday._id || index} className="holiday-item">
               <div className="holiday-header">
                 <span className="holiday-date">{formatDateWithDay(holiday.date)}</span>
                 <span className="holiday-name">{holiday.name}</span>
               </div>
               {holiday.description && (
                 <span className="holiday-description">{holiday.description}</span>
               )}
             </li>
          ))}
        </ul>
      </div>
        ))}
      </>
    );
  };

  const toggleView = () => {
    setShowAllHolidays(!showAllHolidays);
  };

  return (
    <div className="holiday-card">
      <h3 className="holiday-title">
        {showAllHolidays ? 'ALL NATIONAL HOLIDAYS' : 'UPCOMING HOLIDAYS'}
      </h3>
      
      <div className="holiday-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading holidays...</p>
          </div>
        ) : showAllHolidays ? (
          allHolidays.length > 0 ? (
          <div className="holidays-by-month">
              {renderAllHolidaysByMonth()}
          </div>
        ) : (
          <p className="no-holiday-message">No national holidays found...</p>
          )
        ) : (
          upcomingHolidays.length > 0 ? (
            renderUpcomingHolidays()
          ) : (
            <p className="no-holiday-message">No upcoming holidays in the next 30 days</p>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardHoliday;
