import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useHttpArray } from "../hooks/useHttp";
import { createOneComapny, getAllCompanies } from "../services/company.service";
import { BiMap } from "react-icons/bi";
import { FcContacts } from "react-icons/fc";
import { Link } from "react-router-dom";
import CompanyForm from "../components/Form/CompnyForm";
import { objectToFormData } from "../utils/objectToFormData";
import useQuery from "../hooks/useQuery";
import { notify } from "../utils/toaster";

const CompanyPage = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [dataVersion, setDataVersion] = useState<number>(1);

  const { data: allcompanies, error } = useHttpArray<
    Company.CompanyInterface,
    any
  >(getAllCompanies, null, dataVersion);
  let showAddBool = !!useQuery().get("addnew");
  useEffect(() => {
    setShowAdd(showAddBool);
  }, [showAddBool]);
  return (
    <div>
      <div className="d-flex justify-content-between p-2">
        <h1>All Companies</h1>
        <button
          className={`btn btn-${showAdd ? "danger" : "success"} p-1`}
          onClick={(e) => setShowAdd(!showAdd)}
        >
          {" "}
          {showAdd ? "Close Form" : "Add Company"}
        </button>
      </div>
      {showAdd && (
        <div className="companyAddForm bg-custom-light p-3">
          <CompanyForm
            {...{
              submitButtonText: "Create",
              onSubmit: (values: any) => {
                async function createOneComapnyFunction() {
                  const fData: FormData = objectToFormData(values);
                  await createOneComapny({ fData });
                  notify("success", "Sponser created");
                  setDataVersion(dataVersion + 1);
                }
                createOneComapnyFunction();
              },
            }}
          />
        </div>
      )}

      {allcompanies?.map((company) => (
        <div className="row justify-content-center">
          <Card
            key={company._id}
            {...{
              className: "my-5 rounded ",
              render: () => (
                <div className="company card__Container bg-white p-3  justify-content-center rounded row">
                  <div className="col-6">
                    <h2>
                      <Link to={`/company/${company._id}`}>
                        {" "}
                        {company.name}{" "}
                      </Link>
                    </h2>

                    <div className="company__CompnayInfo">
                      <small className="text-muted">
                        <BiMap /> {company?.address}
                      </small>
                      <br />
                      <small className="text-muted">
                        <FcContacts /> {company?.contact}
                      </small>
                    </div>
                    <div className="row">
                      {company.links.map((link) => (
                        <Card
                          key={`${link.name} -- ${link.url}`}
                          {...{
                            className: "p-1 col-4",
                            render: () => <a href={link.url}>{link.name}</a>,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-3">
                    <img
                      style={{
                        width: "150px",
                        height: "100%",
                        border: "2px solid #000",
                      }}
                      className="companydetail__companyProfilePicture"
                      src={`https://ka-mao.xyz/${company.image}`}
                    />
                  </div>
                </div>
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CompanyPage;
