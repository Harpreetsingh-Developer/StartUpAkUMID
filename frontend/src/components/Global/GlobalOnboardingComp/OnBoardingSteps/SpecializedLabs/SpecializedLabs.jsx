import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx";
import "./SpecializedLabs.scss";

const SpecializedLabs = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData.specializedLabs || {},
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("specializedLabs", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("specializedLabs", data);
    console.log("Saved Specialized Labs:", data);
  };

  return (
    <form className="specialized-labs-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Specialized Labs</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="labName">Lab Name</label>
          <input type="text" id="labName" {...register("labName", { required: true })} />
          {errors.labName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Key Equipment</label>
          <input type="text" id="equipment" {...register("equipment")} />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input type="text" id="capacity" {...register("capacity")} />
        </div>

        <div className="form-group">
          <label htmlFor="labType">Lab Type</label>
          <input type="text" id="labType" {...register("labType")} />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <input type="text" id="availability" {...register("availability")} />
        </div>

        <div className="form-group">
          <label htmlFor="supervisor">Supervisor</label>
          <input type="text" id="supervisor" {...register("supervisor")} />
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

export default SpecializedLabs;
