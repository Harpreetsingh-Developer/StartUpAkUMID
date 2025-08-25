import React, { useState, useEffect } from 'react';
import './GlobalIncubationMain.scss';
import GlobalIncubationHeader from '../GlobalIncubationHeader/GlobalIncubationHeader';
import axios_client from '../../../../utils/axiosconfigure.jsx';

const GlobalIncubationMain = () => {
  const [incubationData, setIncubationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncubationData = async () => {
    try {
      setLoading(true);
      const response = await axios_client.get('/api/college');
      
      if (response.data.success) {
        setIncubationData(response.data.data);
      } else {
        setError('Failed to fetch incubation data');
      }
    } catch (err) {
      console.error('Error fetching incubation data:', err);
      setError('Error fetching incubation data: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncubationData();
    
    // Add listener for window focus to refresh data when returning from onboarding
    const handleWindowFocus = () => {
      fetchIncubationData();
    };
    
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  if (loading) {
    return (
      <div className="incubation-list-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <p>Loading incubation centers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="incubation-list-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={fetchIncubationData} style={{ marginTop: '10px', padding: '10px 20px' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="incubation-list-container">
      <GlobalIncubationHeader data={incubationData} />
    </div>
  );
};

export default GlobalIncubationMain;
