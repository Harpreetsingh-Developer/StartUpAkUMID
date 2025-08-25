import React, { useState } from 'react';
import icons from '../../../../../constants/icons';
import CreatePlanModal from './CreatePlanModal';
import EditPlanModal from './EditPlanModal';
import './SubscriptionPlanSettings.scss';

const SubscriptionPlanSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([
    {
      id: 'free',
      name: 'Free Plan',
      description: 'Basic plan for individuals or trial users with limited features.',
      price: 0,
      duration: 'Monthly',
      features: ['Up to 5 Users', '1 GB Storage', 'Basic Reports'],
      isCustom: false,
      maxUsers: 5
    },
    {
      id: 'starter',
      name: 'Starter Plan',
      description: 'Ideal for small teams needing access to more modules.',
      price: 499,
      duration: 'Monthly',
      features: ['Up to 20 Users', '10 GB Storage', 'Email Support'],
      isCustom: false,
      maxUsers: 20
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      description: 'Advanced plan for growing institutions or departments.',
      price: 1499,
      duration: 'Monthly',
      features: ['Unlimited Users', '50 GB Storage', 'Advanced Reports'],
      isCustom: false,
      maxUsers: 1000
    },
    {
      id: 'custom',
      name: 'Create Plan',
      description: 'Custom solution for large organizations with SLA & premium features.',
      price: 'Custom',
      duration: 'Monthly',
      features: ['Custom Integrations', 'Dedicated Support', 'Unlimited Storage'],
      isCustom: true,
      maxUsers: 'Unlimited'
    }
  ]);

  const handleEditPlan = (planId) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setIsEditModalOpen(true);
    }
  };

  const handleCreatePlan = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  };

  const handleCreateNewPlan = (formData) => {
    // Create a new plan from form data
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: formData.planName,
      description: formData.description,
      price: formData.price === '' ? 'Custom' : parseInt(formData.price),
      duration: 'Monthly',
      features: formData.features.split('\n').filter(feature => feature.trim() !== ''),
      isCustom: false,
      maxUsers: formData.maxUsers
    };

    // Add the new plan to the plans array
    setPlans(prevPlans => [...prevPlans, newPlan]);
    setIsCreateModalOpen(false);
    
    console.log('Created new plan:', newPlan);
  };

  const handleSaveEditedPlan = (updatedPlan) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === updatedPlan.id ? updatedPlan : plan
      )
    );
    setIsEditModalOpen(false);
    setSelectedPlan(null);
    console.log('Updated plan:', updatedPlan);
  };

  const handleDeletePlan = (planId) => {
    setPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
    console.log('Deleted plan:', planId);
  };

  const handleSavePlans = () => {
    console.log('Saving plans:', plans);
    // Handle save functionality
  };

  const handleDurationChange = (planId, newDuration) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? { ...plan, duration: newDuration }
          : plan
      )
    );
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    if (price === 'Custom') return 'Rs. Custom';
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="subscription-plan-settings">
      <div className="subscription-plan-settings__header">
        <div className="subscription-plan-settings__search">
          
        </div>
      </div>

      <div className="subscription-plan-settings__content">
        <div className="plans-grid">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-card__header">
                <h3 className="plan-card__title">{plan.name}</h3>
                {plan.isCustom ? (
                  <button 
                    className="create-plan-button"
                    onClick={handleCreatePlan}
                    title="Create Plan"
                  >
                    <span className="create-plan-icon">+</span>
                  </button>
                ) : (
                  <button 
                    className="edit-button"
                    onClick={() => handleEditPlan(plan.id)}
                  >
                    Edit
                  </button>
                )}
              </div>
              
              <p className="plan-card__description">{plan.description}</p>
              
              <div className="plan-card__pricing">
                <span className="plan-card__price">{formatPrice(plan.price)}</span>
                <select
                  className="plan-card__duration"
                  value={plan.duration}
                  onChange={(e) => handleDurationChange(plan.id, e.target.value)}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="2 Years">2 Years</option>
                </select>
              </div>
              
              <ul className="plan-card__features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="plan-card__feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="subscription-plan-settings__footer">
        <button className="save-plan-button" onClick={handleSavePlans}>
          Save Plan
        </button>
      </div>

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreatePlan={handleCreateNewPlan}
      />

      <EditPlanModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditedPlan}
        onDelete={handleDeletePlan}
        planData={selectedPlan}
      />
    </div>
  );
};

export default SubscriptionPlanSettings;
