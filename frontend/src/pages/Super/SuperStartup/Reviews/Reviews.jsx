import React from 'react';
import SuperLayout from '../../../../layouts/SuperLayout/SuperLayout';
import './Reviews.scss';
import NavBar from '../../../../components/Super/SuperStartupComp/NavBar/NavBar';

const SuperUserReviews = () => {
  return (
    <SuperLayout>
      <div className="reviews-content">
        <NavBar/>
      </div>
    </SuperLayout>
  );
};

export default SuperUserReviews;