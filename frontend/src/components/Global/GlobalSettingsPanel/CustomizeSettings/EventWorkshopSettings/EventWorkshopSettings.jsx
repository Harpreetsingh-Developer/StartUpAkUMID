import './EventWorkshopSettings.scss';
import React, { useState, useMemo, useRef } from 'react';
import { ChevronDown, ChevronRight, Search, Filter, Bell, Plus, X } from 'lucide-react';

const initialEvents = [
  { id: '1', title: 'Work Start', time: '8:00 AM', color: 'blue', date: new Date('2025-08-25T08:00:00') },
  { id: '2', title: 'All-Team Kickoff', time: '8:00 AM', color: 'blue', date: new Date('2025-08-25T08:00:00') },
  { id: '3', title: 'Design Review Review', time: '9:00 AM', color: 'green', date: new Date('2025-08-26T09:00:00') },
  { id: '4', title: 'Wellness Fridays', time: '9:00 AM', color: 'blue', date: new Date('2025-08-29T09:00:00') },
  { id: '5', title: 'Coffee Chat', time: '9:00 AM', color: 'green', date: new Date('2025-08-28T09:00:00') },
  { id: '6', title: 'Coffee Chat', time: '9:00 AM', color: 'green', date: new Date('2025-08-29T09:00:00') },
  { id: '7', title: 'Financial Update', time: '10:00 AM', color: 'blue', date: new Date('2025-08-25T10:00:00') },
  { id: '8', title: 'Healthy Remote Walkthrough', time: '10:00 AM', color: 'purple', date: new Date('2025-08-28T10:00:00') },
  { id: '9', title: 'New Employee Welcome Lunch', time: '11:00 AM', color: 'purple', date: new Date('2025-08-25T11:00:00') },
  { id: '10', title: 'Onboarding Presentation', time: '11:00 AM', color: 'purple', date: new Date('2025-08-27T11:00:00') },
  { id: '11', title: 'Design System Kickoff Lunch', time: '12:00 PM', color: 'blue', date: new Date('2025-08-26T12:00:00') },
  { id: '12', title: 'Marketing and testing', time: '12:00 PM', color: 'blue', date: new Date('2025-08-29T12:00:00') },
  { id: '13', title: 'Design Review', time: '1:00 PM', color: 'blue', date: new Date('2025-08-25T13:00:00') },
  { id: '14', title: '1:1s Workshop', time: '1:00 PM', color: 'blue', date: new Date('2025-08-27T13:00:00') },
  { id: '15', title: 'Design Review', time: '1:00 PM', color: 'blue', date: new Date('2025-08-28T13:00:00') },
  { id: '16', title: '1:1 with Jon', time: '2:00 PM', color: 'orange', date: new Date('2025-08-25T14:00:00') },
  { id: '17', title: 'Concept Design Review B', time: '2:00 PM', color: 'blue', date: new Date('2025-08-26T14:00:00') },
  { id: '18', title: '1:1 break', time: '2:00 PM', color: 'orange', date: new Date('2025-08-29T14:00:00') },
  { id: '19', title: 'Design Team Happy Hour', time: '4:00 PM', color: 'red', date: new Date('2025-08-25T16:00:00') },
  { id: '20', title: 'Happy Hour', time: '4:00 PM', color: 'red', date: new Date('2025-08-29T16:00:00') }
];

const SidebarItem = ({ title, subtitle, count, isExpanded, onToggle, color = "blue" }) => (
  <div className="sidebar-item">
    <button className="sidebar-button" onClick={onToggle}>
      {isExpanded ? <ChevronDown className="chevron" /> : <ChevronRight className="chevron" />}
      <div className="item-content">
        <div className="item-title">{title}</div>
  <div className={`item-subtitle ${color}`}>{subtitle} {subtitle && '•'} {count} events</div>
      </div>
    </button>
  </div>
);

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function App() {
  const [expandedItems, setExpandedItems] = useState(['company']);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('Weekly');
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newColor, setNewColor] = useState('blue');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, events]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleItem = (item) => {
    setExpandedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const startOfWeek = useMemo(() => {
    const start = new Date(currentDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    return start;
  }, [currentDate]);

  const dates = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  }, [startOfWeek]);

  const miniCalendarDays = useMemo(() => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfWeek = monthStart.getDay();
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    
  const emptyCells = Array(firstDayOfWeek).fill(null).map((_, index) => ({ id: `empty-${index}`, date: null }));
    const dayCells = daysInMonth.map(date => ({ id: date.toISOString(), date }));
    
    return [...emptyCells, ...dayCells];
  }, [currentDate]);

  const timeSlots = ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'];

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewTime('');
    setNewColor('blue');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newTime) return;

    const [timeValue, ampm] = newTime.split(' ');
    let hour = parseInt(timeValue);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const eventDate = new Date(newDate);
    eventDate.setHours(hour, 0, 0, 0);

    const newEvent = {
      id: Date.now().toString(),
      title: newTitle,
      time: newTime,
      color: newColor,
      date: eventDate
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    handleCloseModal();
  };
  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleViewChange = (view) => {
    setViewMode(view);
  };

  const getEventsForCell = (date, time) => {
    const [timeValue, ampm] = time.split(' ');
    let hour = parseInt(timeValue);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      const isSameDay = eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
      const isSameHour = eventDate.getHours() === hour;
      return isSameDay && isSameHour;
    });
  };

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <>
      <style>{`
      `}</style>
      <div className="calendar-interface">
        <div className="header">
          <div className="header-left">
          </div>
        </div>

        <div className="main-container">
          <div className="sidebar">
            <div className="month-nav">
                <div className="header-left">
                    <h1 className="month-title">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
                    <div className="nav-controls">
                        <button className="nav-btn" onClick={handlePreviousMonth}>
                            <ChevronRight className="chevron rotate" />
                        </button>
                        <button className="nav-btn" onClick={handleNextMonth}>
                            <ChevronRight className="chevron" />
                        </button>
                    </div>
                </div>
                <div className="mini-calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`${day}-${index}`} className="day-header">{day}</div>
          ))}
          {miniCalendarDays.map((day) => (
            <div
              key={day.id}
              className={`date-cell${day.date && day.date.toDateString() === new Date().toDateString() ? ' today' : ''}${day.date && day.date.toDateString() === currentDate.toDateString() ? ' selected' : ''}`}
              onClick={() => day.date && setCurrentDate(day.date)}
            >
              {day.date ? day.date.getDate() : ''}
            </div>
          ))}
                </div>
            </div>

            <div className="filter-controls">
              <div className="filter-section">
                <Filter className="filter-icon" onClick={handleFilterClick} />
                <span>Filter</span>
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`month-btn${viewMode === 'Monthly' ? ' active' : ''}`}
                  onClick={() => handleViewChange('Monthly')}
                >
                  Month
                  <ChevronRight className="chevron" />
                </button>
              </div>
              
              {isFilterOpen && (
                <div className="filter-panel">
                  Filter options would go here.
                </div>
              )}
              
              <div className="view-options">
                <div className={`view-item${viewMode === 'Day' ? ' active' : ''}`} onClick={() => handleViewChange('Day')}>Day</div>
                <div className={`view-item${viewMode === 'Weekly' ? ' active' : ''}`} onClick={() => handleViewChange('Weekly')}>Weekly</div>
                <div className={`view-item${viewMode === 'Monthly' ? ' active' : ''}`} onClick={() => handleViewChange('Monthly')}>Monthly</div>
                <div className={`view-item${viewMode === 'Yearly' ? ' active' : ''}`} onClick={() => handleViewChange('Yearly')}>Yearly</div>
              </div>
            </div>

            <div className="sidebar-content">
              <SidebarItem
                title="Company"
                subtitle="Jan 31 - Feb"
                count={3}
                isExpanded={expandedItems.includes('company')}
                onToggle={() => toggleItem('company')}
                color="blue"
              />
              <SidebarItem
                title="Indian"
                subtitle="Jan 31 - 1"
                count={3}
                isExpanded={expandedItems.includes('indian')}
                onToggle={() => toggleItem('indian')}
                color="green"
              />
              <SidebarItem
                title="Music Festival 2023"
                subtitle="Jan 31 - Feb 4"
                count={2}
                isExpanded={expandedItems.includes('music')}
                onToggle={() => toggleItem('music')}
                color="purple"
              />
              <SidebarItem
                title="Government Holiday"
                subtitle="Jan 31 - Feb 4"
                count={2}
                isExpanded={expandedItems.includes('government')}
                onToggle={() => toggleItem('government')}
                color="orange"
              />
              <SidebarItem
                title="New Year Festival"
                subtitle=""
                count={0}
                isExpanded={expandedItems.includes('newyear')}
                onToggle={() => toggleItem('newyear')}
                color="gray"
              />
            </div>
          </div>

          <div className="content-area">
            <div className="calendar-header">
              <div className="header-left">
                <div className="nav-controls">
                  <button className="nav-btn" onClick={handlePreviousWeek}>
                    <ChevronRight className="chevron rotate" />
                  </button>
                  <button className="today-btn" onClick={handleToday}>Today</button>
                  <button className="nav-btn" onClick={handleNextWeek}>
                    <ChevronRight className="chevron" />
                  </button>
                </div>
              </div>

              <div className="header-right" style={{ position: 'relative' }}>
                <div className="search-container">
                  <Search className="search-icon" />
                  <input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <button className="create-button" onClick={handleCreateNew}>
                  <Plus className="plus-icon" />
                  Create New
                </button>
                <div ref={notificationRef} style={{ display: 'inline-block' }}>
                  <Bell className="bell-icon" onClick={handleBellClick} style={{ cursor: 'pointer' }} />
                  {showNotifications && (
                    <div style={{
                      position: 'absolute',
                      top: '28px',
                      right: 0,
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      minWidth: '220px',
                      zIndex: 1001,
                      padding: '10px',
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Notifications</div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Event "Work Start" at 8:00 AM</li>
                        <li style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>New Employee Welcome Lunch at 11:00 AM</li>
                        <li style={{ padding: '6px 0' }}>Design Team Happy Hour at 4:00 PM</li>
                      </ul>
                      <div style={{ textAlign: 'right', marginTop: 8 }}>
                        <button style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }} onClick={() => setShowNotifications(false)}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="calendar-grid-container">
              <div className="grid-header-row">
                <div className="header-cell time"></div>
                {dates.map((date, index) => (
                  <div key={date.toISOString()} className="header-cell">
                    <div className="day-name">{dayNames[index]}</div>
                    <div className="date-number">{date.getDate()}</div>
                  </div>
                ))}
              </div>
              <div className="main-grid">
                <div className="time-column">
                  {timeSlots.map((time) => (
                    <div key={time} className="time-slot">
                      {time}
                    </div>
                  ))}
                </div>
                {dates.map((date) => (
                  <div key={date.toISOString()} className="events-column">
                    {timeSlots.map((time) => (
                      <div key={`${time}-${date.toISOString()}`} className="event-cell">
                        {getEventsForCell(date, time).map(event => (
                          <div key={event.id} className={`event ${event.color}`}>
                            <div className="event-time">{event.time}</div>
                            <div className="event-title">{event.title}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Add New Event</h2>
                  <button className="close-button" onClick={handleCloseModal}>
                    <X />
                  </button>
                </div>
                <form className="modal-form" onSubmit={handleAddEvent}>
                  <label>Title</label>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                  <label>Date</label>
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
                  <label>Time</label>
                  <select value={newTime} onChange={e => setNewTime(e.target.value)} required>
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <label>Color</label>
                  <div className="color-picker">
                    {['blue', 'green', 'purple', 'orange', 'red'].map(color => (
                      <div
                        key={color}
                        className={`color-option ${color}-color${newColor === color ? ' selected' : ''}`}
                        onClick={() => setNewColor(color)}
                      />
                    ))}
                  </div>
                  <button type="submit">Add Event</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}