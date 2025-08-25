import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx";
import "./PhysicalSpaceRequirement.scss";

const PhysicalSpaceRequirement = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.physicalSpace || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("physicalSpace", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("physicalSpace", data);
    console.log("Saved Physical Space Data:", data);
  };

  return (
    <form className="physical-space-requirement-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Physical Space Requirement</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="spaceType">Space Type</label>
          <input type="text" id="spaceType" {...register("spaceType", { required: true })} />
          {errors.spaceType && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="area">Area Required (e.g., sq ft)</label>
          <input type="text" id="area" {...register("area")} />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input type="number" id="capacity" {...register("capacity")} />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose</label>
          <input type="text" id="purpose" {...register("purpose")} />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input type="text" id="duration" {...register("duration")} />
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

export default PhysicalSpaceRequirement;
