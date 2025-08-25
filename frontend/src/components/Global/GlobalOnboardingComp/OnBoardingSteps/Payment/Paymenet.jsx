import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../../../context/FormContext.jsx";
import "./Payment.scss";

const Payment = () => {
  const { formData, updateStepData } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: formData.paymentDetails || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateStepData("paymentDetails", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    updateStepData("paymentDetails", data);
    console.log("Saved Payment Details:", data);
  };

  return (
    <form className="payment-details-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Payment Details</h3>
      <hr />
      <div className="grid">
        <div className="form-group">
          <label htmlFor="accountName">Account Name</label>
          <input type="text" id="accountName" {...register("accountName", { required: true })} />
          {errors.accountName && <span className="error">Required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input type="text" id="accountNumber" {...register("accountNumber")} />
        </div>

        <div className="form-group">
          <label htmlFor="ifsc">IFSC Code</label>
          <input type="text" id="ifsc" {...register("ifsc")} />
        </div>

        <div className="form-group">
          <label htmlFor="bankName">Bank Name</label>
          <input type="text" id="bankName" {...register("bankName")} />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input type="text" id="branch" {...register("branch")} />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMode">Payment Mode</label>
          <select id="paymentMode" {...register("paymentMode")}>
            <option value="">Select payment mode</option>
            <option value="cheque">Cheque</option>
            <option value="online">Online</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gst">GST Number</label>
          <input type="text" id="gst" {...register("gst")} />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <input type="text" id="notes" {...register("notes")} />
        </div>
      </div>
    </form>
  );
};

export default Payment;
