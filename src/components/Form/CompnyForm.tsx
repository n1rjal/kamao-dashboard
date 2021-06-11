import { Form, Formik, FieldArray } from "formik";
import React from "react";
import * as Yup from "yup";

const CompanyFormSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  address: Yup.string().required("Address is required!"),
  contact: Yup.string().required("Contact is required!"),
  company_image: Yup.mixed().notRequired(),
  links: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(2, "too short").required("Required"), // these constraints take precedence
        url: Yup.string().required("Required"), // these constraints take precedence
      })
    )
    .required("Must have links") // these constraints are shown if and only if inner constraints are satisfied
    .min(1, "Minimum of 1 link must be provided"),
});

const CompanyForm = (props: any) => {
  return (
    <Formik
      initialValues={{
        name: props?.initialValues?.name || "",
        contact: props?.initialValues?.contact || "",
        address: props?.initialValues?.address || "",
        links: props?.initialValues?.links || [{ name: "", url: "" }],
        company_image: props?.initialValues?.image || "",
      }}
      onSubmit={props.onSubmit}
      validationSchema={CompanyFormSchema}
    >
      {({ values, handleChange, errors, setFieldValue }) => (
        <>
          <Form className="row justify-content-between">
            <div className="col-5">
              <h3 className="my-4">Company Details</h3>
              <hr />
              <div className="form-group my-2">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <small className="text-danger p-2">{errors.name || ""}</small>
              </div>
              <div className="form-group my-2">
                <label htmlFor="contact">Contact</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                />
                <small className="text-danger p-2 ">
                  {errors.contact || ""}
                </small>
              </div>
              <div className="form-group my-2">
                <label htmlFor="name">Address</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                <small className="text-danger p-2">
                  {errors.address || ""}
                </small>
              </div>
              <div className="form-group my-2">
                <label htmlFor="name">Company Logo</label>
                <br />
                <input
                  accept="image/*"
                  type="file"
                  className="form-control"
                  name="company_image"
                  onChange={(e) => {
                    if (e.currentTarget.files) {
                      setFieldValue("company_image", e.currentTarget.files[0]);
                    }
                  }}
                />
              </div>
              <div className="my-3">
                <input
                  type="submit"
                  className="btn btn-success p-1 my-3 text-center"
                  value={props.submitButtonText}
                />
              </div>
            </div>
            <div className="col-5">
              {values.links && (
                <>
                  <h3 className="my-4">Company Links</h3>
                  <hr />
                </>
              )}

              <FieldArray name="links" validateOnChange={true}>
                {(arrayHelpers) => (
                  <div>
                    {values.links &&
                      values.links?.map((link: any, index: number) => (
                        <div key={index} className="form-group my-3 p-1 border">
                          <h5 className="my-2">Link Name : {link.name}</h5>
                          <input
                            type="text"
                            placeholder="Link name Eg Facebook"
                            className="form-control form-control-sm"
                            name={`links[${index}].name`}
                            value={values.links[index].name}
                            onChange={handleChange}
                          />
                          <br />
                          <input
                            type="text"
                            placeholder="Link URL"
                            className="form-control form-control-sm"
                            name={`links[${index}].url`}
                            value={values.links[index].url}
                            onChange={handleChange}
                          />
                          <br />
                          {arrayHelpers.form.values.links.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger p-2 mx-1"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                          )}
                          <button
                            className="btn btn-custom-primary p-2 mx-1"
                            onClick={() =>
                              arrayHelpers.push({ name: "", url: "" })
                            }
                          >
                            +
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </FieldArray>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default CompanyForm;
