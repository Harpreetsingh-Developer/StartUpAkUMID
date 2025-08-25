import React from 'react';
import SuperLayout from '../../../../layouts/SuperLayout/SuperLayout';
import './ScoreCard.scss';
import NavBar from '../../../../components/Super/SuperStartupComp/NavBar/NavBar';

const SuperUserScoreCard = () => {
  return (
    <SuperLayout>
      <div className="score-card-content">
        <NavBar/>
      </div>
    </SuperLayout>
  );
};

export default SuperUserScoreCard;