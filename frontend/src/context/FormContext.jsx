import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  generalDetails: {},
  physicalSpace: {},
  itDigitalInfra: {},
  operationalServices: {},
  digitalToolsSoftware: {},
  specializedLabs: {},
  additionalFacilities: {},
  paymentDetails: {},
};


const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STEP':
      return {
        ...state,
        [action.step]: {
          ...state[action.step],
          ...action.payload,
        },
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};


const FormContext = createContext();


export const FormProvider = ({ children }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  
  const updateStepData = (step, payload) => {
    dispatch({ type: 'UPDATE_STEP', step, payload });
  };

 
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <FormContext.Provider value={{ formData, updateStepData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};


export const useFormContext = () => useContext(FormContext);
