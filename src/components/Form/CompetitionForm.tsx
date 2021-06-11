import { Form, Formik } from "formik";
import * as Yup from "yup";
import TagsInput from "./TagsInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const competitionSchema = Yup.object({
  categories: Yup.array()
    .of(Yup.string())
    .min(2, "Please provide at least two categories"),
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  startDate: Yup.date().min(new Date(), "Start Date can't be past"),
  endDate: Yup.date().min(Yup.ref("startDate")),
});

const CompetitionForm = (props: any) => (
  <Formik
    validationSchema={competitionSchema}
    onSubmit={props.onSubmit}
    initialValues={{
      title: props?.initialValues?.title || "",
      description: props?.initialValues?.description || "",
      categories: props?.initialValues?.categories || [],
      startDate:
        (props?.initialValues?.startDate &&
          new Date(props?.initialValues?.startDate)) ||
        new Date(),
      endDate:
        (props?.initialValues?.endDate &&
          new Date(props?.initialValues?.endDate)) ||
        new Date(),
    }}
  >
    {({ values, handleChange, errors, setFieldValue, isSubmitting }) => {
      return (
        <Form className="p-3">
          <div className="row">
            <div className="col-lg-5 col-10 col-md-5">
              <div className="form-group my-3">
                <label htmlFor="title">Title</label>
                <br />
                <input
                  type="text"
                  name="title"
                  placeholder="Enter new competition name"
                  onChange={handleChange}
                  value={values.title}
                  className="form-control"
                />
                <small className="text-danger">{errors.title}</small>
              </div>
              <div className="form-group my-3">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  placeholder="Description"
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  className="form-control"
                  rows={8}
                />
                <small className="text-danger">{errors.description}</small>
              </div>
            </div>
            <div className="col-lg-5 col-10 col-md-5">
              <div className="form-group my-3">
                <label htmlFor="description">Categories</label>
                <br />
                <TagsInput
                  tags={values.categories}
                  onChange={(categories: any) => {
                    setFieldValue("categories", categories);
                  }}
                />
                <small className="text-danger">{errors.categories}</small>
              </div>
              <div className="form-group my-3">
                <label htmlFor="description">Starting Date</label>
                <br />
                <DatePicker
                  withPortal={true}
                  value={values.startDate}
                  selected={values.startDate}
                  onChange={(date) => setFieldValue("startDate", date)}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                ></DatePicker>
                <small className="text-danger">{errors.startDate}</small>
              </div>
              <div className="form-group my-3">
                <label htmlFor="endDate">Ending Date</label>
                <br />
                <DatePicker
                  withPortal={true}
                  value={values.endDate}
                  selected={values.endDate}
                  onChange={(date) => setFieldValue("endDate", date)}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                ></DatePicker>
                <small className="text-danger">{errors.endDate}</small>
              </div>
              <input
                type="submit"
                // disabled={isSubmitting}
                value={props.submitValue || "Create"}
                className="btn btn-custom-primary p-1"
              />
            </div>
          </div>
        </Form>
      );
    }}
  </Formik>
);

export default CompetitionForm;
