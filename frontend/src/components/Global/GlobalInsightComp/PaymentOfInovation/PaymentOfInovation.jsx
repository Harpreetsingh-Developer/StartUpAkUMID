import React, { useEffect, useState } from "react";
import "./PaymentOfInovation.scss";

const PaymentOfInovation = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

    //   useEffect(() => {
    //     // Replace with your actual API
    //     const fetchData = async () => {
    //       const response = await fetch("/api/innovation-payments");
    //       const result = await response.json();
    //       setData(result);
    //     };

    //     fetchData();
    //   }, []);

    useEffect(() => {
        const dummyData = [
        { name: "Startup Alpha", daysLeft: 50, subscription: "3 Years" },
        { name: "InnovateX", daysLeft: 40, subscription: "3 Years" },
        { name: "TechNova", daysLeft: 20, subscription: "2 Years" },
        { name: "FutureCore", daysLeft: 32, subscription: "2 Years" },
        { name: "VisionSpark", daysLeft: 48, subscription: "2 Years" },
        { name: "GreenByte", daysLeft: 54, subscription: "6 Months" },
        { name: "InnoHive", daysLeft: 75, subscription: "6 Months" },
        { name: "NexGen Labs", daysLeft: 92, subscription: "3 Months" },
        { name: "CodeBridge", daysLeft: 12, subscription: "1 Year" },
        { name: "DeepThink", daysLeft: 5, subscription: "1 Month" }
        ];
        setData(dummyData);
    }, []);

    const applyFilter = (data) => {
        if (filter === "days") {
          return [...data].sort((a, b) => a.daysLeft - b.daysLeft);
        } else if (filter === "subscription") {
          const parseSubscription = (sub) => {
            const [value, unit] = sub.toLowerCase().split(" ");
            const num = parseInt(value, 10);
            return unit.includes("year") ? num * 12 : num;
          };
          return [...data].sort((a, b) => parseSubscription(a.subscription) - parseSubscription(b.subscription));
        }
        return data;
      };
      

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (value) => {
    setFilter(value);
    setShowDropdown(false);
  };

  return (
    <div className="payment-container">
      <div className="header">
        <h3>PAYMENT OF INOVATIONS</h3>
        <div className="filter-wrapper">
          <span className="filter-label" onClick={toggleDropdown}>
            FILTER <span className="filter-icon"></span>
          </span>
          {showDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleSelect("days")}>Arrange by Days (Asc)</div>
              <div onClick={() => handleSelect("subscription")}>Arrange by Subscription (Asc)</div>
            </div>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>DAYS LEFT</th>
              <th>SUBSCRIPTION CHART</th>
            </tr>
          </thead>
          <tbody>
            {applyFilter(data).slice(0, 10).map((org, index) => (
              <tr key={index}>
                <td>{org.name}</td>
                <td>{org.daysLeft} days</td>
                <td>{org.subscription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentOfInovation;
