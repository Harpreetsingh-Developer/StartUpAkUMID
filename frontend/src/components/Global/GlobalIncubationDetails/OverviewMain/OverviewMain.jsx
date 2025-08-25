import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IncubationDetailsNavBar from '../IncubationDetailsNavBar/IncubationDetailsNavBar';
import OverviewManagerDetails from '../OverviewManagerDetails/OverviewManagerDetails';
import icons from '../../../../constants/icons';
import OverviewStartupCard from '../OverviewStartupCard/OverviewStartupCard';
import OverviewStats1 from '../OverviewStats1/OverviewStats1';
import './OverviewMain.scss';
import OverviewStats2 from '../OverviewStats2/OverviewStats2';
import OverviewDetailCardOne from '../OverviewDetailCardOne/OverviewDetailCardOne';
import OverviewDetailCardTwo from '../OverviewDetailCardTwo/OverviewDetailCardTwo';
import axios_client from '../../../../utils/axiosconfigure.jsx';

const OverviewMain = () => {
  const { id } = useParams();
  const [incubationData, setIncubationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncubationDetail = async () => {
    try {
      setLoading(true);
      const response = await axios_client.get(`/api/college/${id}`);
      
      if (response.data.success) {
        setIncubationData(response.data.data);
      } else {
        setError('Failed to fetch incubation details');
      }
    } catch (err) {
      console.error('Error fetching incubation details:', err);
      setError('Error fetching incubation details: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchIncubationDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="overview-container">
        <IncubationDetailsNavBar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <p>Loading incubation details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overview-container">
        <IncubationDetailsNavBar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={fetchIncubationDetail} style={{ marginTop: '10px', padding: '10px 20px' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!incubationData) {
    return (
      <div className="overview-container">
        <IncubationDetailsNavBar />
        <p>Incubation center not found.</p>
      </div>
    );
  }

  // Create manager data from the incubation data or use defaults
  const managerData = {
    name: incubationData.contactInfo?.accountName || "Manager Name Not Available",
    title: "Incubation Center Manager",
    location: incubationData.location || "Location Not Available",
    email: incubationData.contactInfo?.contact || "Email Not Available", 
    phone: incubationData.operationalServices?.contact || "Phone Not Available",
    image: icons.UserAvatar,
  };

  return (
    <div className="overview-container">
      <IncubationDetailsNavBar />
      <h1 className="overview-title">{incubationData.name}</h1>
      <div className="overview-dashboard-grid">
        {/* Each card is wrapped in a div with a grid-area class */}
        <div className="grid-item-manager">
          <OverviewManagerDetails manager={managerData} />
        </div>
        <div className="grid-item-stats1">
          <OverviewStats1 incubationData={incubationData} />
        </div>
        <div className="grid-item-stats2">
          <OverviewStats2 incubationData={incubationData} />
        </div>
        <div className="grid-item-startups">
          <OverviewStartupCard incubationData={incubationData} />
        </div>
        <div className="grid-item-details1">
          <OverviewDetailCardOne incubationData={incubationData} />
        </div>
        <div className="grid-item-details2">
          <OverviewDetailCardTwo incubationData={incubationData} />
        </div>
      </div>
    </div>
  );
};
  
export default OverviewMain;
