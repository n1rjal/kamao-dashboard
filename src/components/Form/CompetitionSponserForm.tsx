import { useFormik, Field } from "formik";
import React from "react";

const CompetitionSponserForm = (props: any) => {
  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    handleChange,
    values,
    errors,
  } = useFormik({
    initialValues: {
      sponser_type: props?.sponser_type || "",
      companyId: props?.companyId || "",
    },
    onSubmit: props.onSubmit,
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.sponser_type) {
        errors.sponser_type = "Sponser Type is requered";
      }
      if (!values.companyId) {
        errors.companyId = "Company is required";
      }
      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit} onBlur={handleBlur}>
      <div className="form-group my-2">
        <label htmlFor="sponserType">Sponser Type</label>
        <br />
        <input
          name="sponser_type"
          type="text"
          className="form-control"
          placeholder="Sponser Type"
          onChange={handleChange}
          value={values.sponser_type}
        />
        <small className="text-muted text-danger">{errors.sponser_type}</small>
      </div>

      <div className="form-group my-2">
        <label htmlFor="lastName">Select a Company</label>
        <select
          id="companyId"
          className="form-select"
          name="companyId"
          onChange={handleChange}
          value={values.companyId}
        >
          {props?.allCompaniesAsOption?.map((company: any) => (
            <option value={company.value}>{company.name}</option>
          ))}
        </select>
        <small className="text-muted text-danger">{errors.companyId}</small>
      </div>
      <button
        className="btn btn-success p-1 my-2"
        disabled={isSubmitting}
        type="submit"
      >
        Edit Sponser
      </button>
    </form>
  );
};

export default CompetitionSponserForm;
