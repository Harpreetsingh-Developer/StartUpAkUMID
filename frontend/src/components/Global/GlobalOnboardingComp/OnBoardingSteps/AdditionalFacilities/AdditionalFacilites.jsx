import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx";; 
import "./AdditionalFacilites.scss";

const AdditionalFacilities = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.additionalFacilities || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("additionalFacilities", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("additionalFacilities", data);
    console.log("Saved Additional Facilities:", data);
  };

  return (
    <form className="additional-facilities-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Additional Facilities</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="facilityName">Facility Name</label>
          <input type="text" id="facilityName" {...register("facilityName", { required: true })} />
          {errors.facilityName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" id="type" {...register("type")} />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <input type="text" id="availability" {...register("availability")} />
        </div>

        <div className="form-group">
          <label htmlFor="provider">Provider</label>
          <input type="text" id="provider" {...register("provider")} />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input type="text" id="contact" {...register("contact")} />
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
          <label htmlFor="notes">Notes</label>
          <input type="text" id="notes" {...register("notes")} />
        </div>
      </div>
    </form>
  );
};

export default AdditionalFacilities;
