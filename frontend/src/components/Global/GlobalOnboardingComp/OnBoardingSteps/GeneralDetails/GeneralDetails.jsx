import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx"; 
import "./GeneralDetails.scss";

const GeneralDetails = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.generalDetails || {}
  });

  
  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("generalDetails", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("generalDetails", data); 
   
    console.log("Saved General Details:", data);
  };

  return (
    <form className="general-details-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>General Details</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="centerName">Incubation Center Name</label>
          <input type="text" id="centerName" {...register("incubationCenterName", { required: true })} />
          {errors.incubationCenterName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="expertise">Expertise</label>
          <input type="text" id="expertise" {...register("expertise", { required: true })} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address", { required: true })} />
        </div>

        <div className="form-group">
          <label htmlFor="area">Total Area Available (e.g., ft)</label>
          <input type="text" id="area" {...register("totalAreaAvailable")} />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Target Startup Capacity (No. of Startup)</label>
          <input type="number" id="capacity" {...register("targetStartupCapacity")} />
        </div>

        <div className="form-group">
          <label htmlFor="foundationDate">Date of Foundation</label>
          <input type="date" id="foundationDate" {...register("dateOfFoundation")} />
        </div>

        <div className="form-group">
          <label htmlFor="industryFocus">Industry Focus</label>
          <select id="industryFocus" {...register("industryFocus")}>
            <option value="">Select the industry focus</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="agriculture">Agriculture</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="aboutCampus">About Campus</label>
          <input type="text" id="aboutCampus" {...register("aboutCampus")} />
        </div>
      </div>
    </form>
  );
};

export default GeneralDetails;
