import React, { useState, useEffect, useRef } from 'react';
import './SubscriptionPlanSettings.scss';

const pricingPlans = {
  monthly: [
    {
      title: 'Starter',
      price: 'Free',
      period: '',
      description: 'Ideal for freelancers with Client Billing',
      features: [
        { name: '2 Projects', description: 'Create and manage up to 2 projects' },
        { name: 'Client Billing', description: 'Seamless billing for clients' },
        { name: 'Free Staging', description: 'Free staging environment' },
        { name: 'Code Export', description: 'Export code with one click' },
        { name: 'White Labeling', description: 'Remove Debbl branding' },
        { name: 'Site Password Protection', description: 'Secure your sites with passwords' }
      ],
      buttonText: 'Current Plan',
      isEnterprise: false,
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      period: '',
      description: 'For organizations with strict compliance needs',
      features: [
        { name: 'Unlimited Projects', description: 'No limit on projects' },
        { name: 'Client Billing', description: 'Enterprise-grade billing' },
        { name: 'Free Staging', description: 'Dedicated staging servers' },
        { name: 'Code Export', description: 'Secure code export' },
        { name: 'White Labeling', description: 'Full custom branding' },
        { name: 'Site Password Protection', description: 'Enterprise-level security' }
      ],
      buttonText: 'Upgrade Plan',
      isEnterprise: true,
    },
    {
      title: 'Pro',
      price: '$36',
      period: '/month',
      description: 'Enhanced plan for growing teams',
      features: [
        { name: '10 Projects', description: 'Manage up to 10 projects' },
        { name: 'Client Billing', description: 'Advanced billing features' },
        { name: 'Free Staging', description: 'Unlimited staging environments' },
        { name: 'Code Export', description: 'Advanced export options' },
        { name: 'White Labeling', description: 'Complete branding customization' },
        { name: 'Site Protection', description: 'Advanced security features' }
      ],
      buttonText: 'Upgrade Plan',
      isEnterprise: false,
      recommended: true
    }
  ],
  yearly: [
    {
      title: 'Starter',
      price: 'Free',
      period: '',
      description: 'Ideal for freelancers with Client Billing',
      features: [
        { name: '2 Projects', description: 'Create and manage up to 2 projects' },
        { name: 'Client Billing', description: 'Seamless billing for clients' },
        { name: 'Free Staging', description: 'Free staging environment' },
        { name: 'Code Export', description: 'Export code with one click' },
        { name: 'White Labeling', description: 'Remove Debbl branding' },
        { name: 'Site Password Protection', description: 'Secure your sites with passwords' }
      ],
      buttonText: 'Current Plan',
      isEnterprise: false,
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      period: '',
      description: 'For organizations with strict compliance needs',
      features: [
        { name: 'Unlimited Projects', description: 'No limit on projects' },
        { name: 'Client Billing', description: 'Enterprise-grade billing' },
        { name: 'Free Staging', description: 'Dedicated staging servers' },
        { name: 'Code Export', description: 'Secure code export' },
        { name: 'White Labeling', description: 'Full custom branding' },
        { name: 'Site Password Protection', description: 'Enterprise-level security' }
      ],
      buttonText: 'Upgrade Plan',
      isEnterprise: true,
    },
    {
      title: 'Pro',
      price: '$360',
      period: '/year',
      description: 'Enhanced plan for growing teams',
      features: [
        { name: '10 Projects', description: 'Manage up to 10 projects' },
        { name: 'Client Billing', description: 'Advanced billing features' },
        { name: 'Free Staging', description: 'Unlimited staging environments' },
        { name: 'Code Export', description: 'Advanced export options' },
        { name: 'White Labeling', description: 'Complete branding customization' },
        { name: 'Site Protection', description: 'Advanced security features' }
      ],
      buttonText: 'Upgrade Plan',
      isEnterprise: false,
      recommended: true
    }
  ],
};

const PricingCard = ({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  buttonText, 
  isEnterprise, 
  isCurrent, 
  onButtonClick, 
  onFeatureClick,
  onFeatureToggle,
  completedFeatures,
  recommended
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleIconClick = (index) => {
    setShowTooltip(prev => (prev === index ? null : index));
  };

  const handleMouseEnter = (index) => setShowTooltip(index);
  const handleMouseLeave = () => setShowTooltip(null);
  const handleFocus = (index) => setShowTooltip(index);
  const handleBlur = () => setShowTooltip(null);

  const isGrayCard = title === 'Starter' || title === 'Pro';

  return (
    <div 
      className={`
        pricing-card 
        ${isGrayCard ? 'gray-card' : ''} 
        ${isEnterprise ? 'enterprise' : ''} 
        ${isCurrent ? 'current' : ''} 
        ${recommended ? 'recommended' : ''}
      `}
    >
      {recommended && <div className="recommended-badge">Most Popular</div>}
      <div className="card-header">
        <h2 className="title">{title}</h2>
        <div className="price-info">
          <span className="price">{price}</span>
          {period && <span className="period">{period}</span>}
        </div>
      </div>
      <div className="plan-description">{description}</div>
      <ul className="features-list" role="list">
        {features.map((feature, index) => {
          const featureKey = `${title}-${feature.name}`;
          const isCompleted = completedFeatures[featureKey] || false;

          return (
            <li 
              key={index} 
              className={`feature-item ${isCompleted ? 'completed' : ''} ${showTooltip === index ? 'tooltip-active' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              role="listitem"
            >
              <div 
                className="icon-container"
                onClick={() => {
                  handleIconClick(index);
                  onFeatureToggle(featureKey);
                }}
                aria-label={isCompleted ? "Mark as incomplete, click to toggle" : "Mark as complete, click to toggle"}
                aria-pressed={isCompleted}
                tabIndex={0}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`checkmark ${isCompleted ? 'checked' : ''}`}
                >
                  {isCompleted ? (
                    <>
                      <circle cx="12" cy="12" r="10" fill="#48bb78" />
                      <path 
                        d="M8 12L10.5 14.5L16 9" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="check-path"
                      />
                    </>
                  ) : (
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      fill="none" 
                      stroke="#b92ff7" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="uncheck-circle"
                    />
                  )}
                </svg>
              </div>
              <span 
                className="feature-text"
                onClick={() => onFeatureClick(feature.name, title)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${feature.name}`}
              >
                {feature.name}
              </span>
              {isCompleted && <span className="completion-badge">Done</span>}
              {showTooltip === index && (
                <div className="feature-tooltip" role="tooltip">
                  {feature.description}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button 
        className={`plan-button ${isCurrent ? 'current-button' : ''}`} 
        onClick={onButtonClick} 
        disabled={isCurrent}
        aria-label={isCurrent ? `Current plan: ${title}` : `Upgrade to ${title}`}
      >
        {buttonText}
        {!isCurrent && <span className="button-arrow">→</span>}
      </button>
    </div>
  );
};

const SubscriptionPlanSettings = () => {
  const [billingPeriod, setBillingPeriod] = useState('yearly');
  const [currentPlan, setCurrentPlan] = useState('Starter');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [featureModal, setFeatureModal] = useState({ open: false, feature: '', plan: '' });
  const [featureValue, setFeatureValue] = useState('');
  const featureInputRef = useRef(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [toast, setToast] = useState('');
  const [completedFeatures, setCompletedFeatures] = useState({});
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const initialCompleted = {};
    pricingPlans[billingPeriod].forEach(plan => 
      plan.features.forEach(feature => {
        initialCompleted[`${plan.title}-${feature.name}`] = Math.random() > 0.5;
      })
    );
    setCompletedFeatures(initialCompleted);
  }, [billingPeriod]);

  const handleToggle = () => {
    setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  const handlePlanButtonClick = (plan) => {
    if (plan.title === currentPlan) {
      setToast('You are already on this plan.');
      setTimeout(() => setToast(''), 3000);
      return;
    }
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan.title);
      setShowUpgradeModal(false);
      setToast(`Successfully switched to: ${selectedPlan.title}`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const cancelUpgrade = () => {
    setShowUpgradeModal(false);
  };

  const handleFeatureClick = (feature, plan) => {
    setFeatureModal({ open: true, feature, plan });
    setFeatureValue(feature);
  };

  const handleFeatureSave = () => {
    setFeatureModal({ open: false, feature: '', plan: '' });
    setToast(`Feature updated successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleFeatureClose = () => {
    setFeatureModal({ open: false, feature: '', plan: '' });
  };

  const handleFeatureToggle = (featureKey) => {
    setCompletedFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
    setToast(completedFeatures[featureKey] ? 'Feature marked as incomplete' : 'Feature marked as complete');
    setTimeout(() => setToast(''), 3000);
  };

  const handleCompareClick = () => {
    setShowCompareModal(true);
  };

  const handleCompareClose = () => {
    setShowCompareModal(false);
  };

  const getCompletionStats = () => {
    const totalFeatures = Object.keys(completedFeatures).length;
    const completedCount = Object.values(completedFeatures).filter(Boolean).length;
    return { totalFeatures, completedCount };
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const { totalFeatures, completedCount } = getCompletionStats();
  const plans = pricingPlans[billingPeriod];
  
  const faqItems = [
    {
      question: "Can I switch plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated based on your usage."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee."
    }
  ];

  return (
    <div className="pricing-container">
      <div className="header">
        <h1>Our Pricing Plans</h1>
        <p>Choose a plan that fits your workflow and scale your projects seamlessly</p>
        
        <div className="billing-section centered-billing-toggle"> 
          <div className="billing-toggle">
            <span className={billingPeriod === 'monthly' ? 'active' : ''} onClick={() => setBillingPeriod('monthly')}>Monthly</span>
            <label className="switch">
              <input type="checkbox" checked={billingPeriod === 'yearly'} onChange={handleToggle} />
              <span className="slider round"></span>
            </label>
            <span className={billingPeriod === 'yearly' ? 'active' : ''} onClick={() => setBillingPeriod('yearly')}>Yearly</span>
          </div>
        </div>
      </div>
      
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
            isCurrent={plan.title === currentPlan}
            onButtonClick={() => handlePlanButtonClick(plan)}
            onFeatureClick={handleFeatureClick}
            onFeatureToggle={handleFeatureToggle}
            completedFeatures={completedFeatures}
          />
        ))}
      </div>
      
      <div className="trust-badges">
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15.5C14.4853 15.5 16.5 13.4853 16.5 11C16.5 8.51472 14.4853 6.5 12 6.5C9.51472 6.5 7.5 8.51472 7.5 11C7.5 13.4853 9.51472 15.5 12 15.5Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21.5C15.5 19 19 15.5 19 11C19 6.5 15.5 3 12 3C8.5 3 5 6.5 5 11C5 15.5 8.5 19 12 21.5Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Secure & Reliable</span>
        </div>
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 12L10 15L17 8" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>99.9% Uptime</span>
        </div>
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16L16 12M12 16L8 12M12 16V8" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>24/7 Support</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="compare-button" onClick={handleCompareClick}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Compare Plans
        </button>
      </div>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className={`faq-item ${activeFAQ === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <h3 id="modal-title">Confirm Plan Change</h3>
            <p>Are you sure you want to switch to the <strong>{selectedPlan?.title || 'Unknown'}</strong> plan?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmUpgrade} autoFocus>Confirm</button>
              <button className="cancel-button" onClick={cancelUpgrade}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {featureModal.open && (
        <div className="modal-overlay">
          <div className="feature-modal">
            <div className="feature-modal-content">
              <div className="modal-header">
                <h3>Edit Feature for {featureModal.plan}</h3>
                <button className="close-button" onClick={handleFeatureClose}>&times;</button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={featureValue}
                  onChange={(e) => setFeatureValue(e.target.value)}
                  ref={featureInputRef}
                  autoFocus
                  placeholder="Enter new feature description"
                />
              </div>
              <div className="modal-footer">
                <button className="confirm-button" onClick={handleFeatureSave}>Save</button>
                <button className="cancel-button" onClick={handleFeatureClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showCompareModal && (
        <div className="modal-overlay">
          <div className="modal-content compare-modal">
            <h3>Compare Plans</h3>
            <div className="compare-table-container">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="feature-column">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.title} className={`plan-column ${plan.recommended ? 'recommended' : ''}`}>
                        <div className="plan-header">
                          <div className="plan-name">{plan.title}</div>
                          <div className="plan-price">
                            {plan.price}{plan.period && <span className="period">{plan.period}</span>}
                          </div>
                          {plan.recommended && <div className="recommended-label">Most Popular</div>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(new Set(plans.flatMap(plan => plan.features.map(f => f.name)))).map(featureName => (
                    <tr key={featureName}>
                      <td className="feature-name">{featureName}</td>
                      {plans.map(plan => (
                        <td key={`${plan.title}-${featureName}`} className="feature-check">
                          {plan.features.some(f => f.name === featureName) ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.6668 5.83325L7.50016 14.9999L3.3335 10.8333" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 5L15 15M15 5L5 15" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCompareClose}>Close</button>
            </div>
          </div>
        </div>
      )}
      
      {toast && (
        <div className="toast-message">
          {toast}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlanSettings;