import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx";
import "./OperationalServices.scss";

const OperationalServices = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.operationalServices || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("operationalServices", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("operationalServices", data);
    console.log("Saved Operational Services:", data);
  };

  return (
    <form className="operational-services-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Operational Services</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="serviceName">Service Name</label>
          <input type="text" id="serviceName" {...register("serviceName", { required: true })} />
          {errors.serviceName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="provider">Provider</label>
          <input type="text" id="provider" {...register("provider")} />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <input type="text" id="availability" {...register("availability")} />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input type="text" id="cost" {...register("cost")} />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input type="text" id="contact" {...register("contact")} />
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">Service Type</label>
          <input type="text" id="serviceType" {...register("serviceType")} />
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

export default OperationalServices;
