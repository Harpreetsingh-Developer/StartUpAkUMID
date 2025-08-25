import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx"; 
import "./IT&DigitalInfra.scss";

const ITDigitalInfra = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.itDigitalInfra || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("itDigitalInfra", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("itDigitalInfra", data);
    console.log("Saved IT & Digital Infrastructure:", data);
  };

  return (
    <form className="it-digital-infra-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>IT & Digital Infrastructure</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="infraName">Infrastructure Name</label>
          <input type="text" id="infraName" {...register("infraName", { required: true })} />
          {errors.infraName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" id="type" {...register("type")} />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input type="text" id="capacity" {...register("capacity")} />
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

export default ITDigitalInfra;
