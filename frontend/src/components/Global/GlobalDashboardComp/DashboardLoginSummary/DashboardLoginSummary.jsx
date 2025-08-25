import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardLoginSummary.scss';

const DashboardLoginSummary = () => {
  // Dummy data for the login summary graph
  const data = [
    { name: 'Mon', logins: 4 },
    { name: 'Tue', logins: 3 },
    { name: 'Wed', logins: 5 },
    { name: 'Thu', logins: 2 },
    { name: 'Fri', logins: 6 },
    { name: 'Sat', logins: 7 },
    { name: 'Sun', logins: 5 },
  ];

  return (
    <div className="login-summary-card">
      <h3 className="login-summary-title">LOGIN SUMMARY</h3>
      <div className="login-summary-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0, // Changed from -10 to 20 to give the label space
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis 
              label={{ value: 'LOGIN (Counts)', angle: -90, position: 'center' }} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 7]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
            />
            <Tooltip />
            <Line type="monotone" dataKey="logins" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLoginSummary;
