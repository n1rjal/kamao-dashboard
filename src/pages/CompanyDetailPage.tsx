import React, { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";
import { FcContacts } from "react-icons/fc";
import { Redirect, useParams } from "react-router";
import Card from "../components/Card/Card";
import CompanyForm from "../components/Form/CompnyForm";
import Loader from "../components/Loader/Loader";
import Std404 from "../components/Std404/Std404";
import { useHttpObject } from "../hooks/useHttp";
import {
  deleteOneCompany,
  getOneCompany,
  updateCompany,
} from "../services/company.service";
import { objectToFormData } from "../utils/objectToFormData";
import { notify } from "../utils/toaster";

const CompanyDetailPage = () => {
  const [companyId, setCompanyId] = useState<string>(
    useParams<{ id?: string }>()?.id || ""
  );
  const [dataVersion, setDataVersion] = useState<number>(0);

  const { data: company, error } = useHttpObject<Company.CompanyInterface, any>(
    getOneCompany,
    {
      id: companyId,
    },
    `${companyId} ${dataVersion}`
  );

  if (error?.error) {
    return (
      <Std404
        {...{
          message1: "OOPS!",
          message2: error?.error,
        }}
      ></Std404>
    );
  }
  if (!company) {
    return <Loader />;
  }
  if (dataVersion === -1) {
    return <Redirect to="/company"></Redirect>;
  }
  return (
    <div className="bg-white p-5">
      <div className="row align-items-center">
        <div className="col-6">
          <h2>{company?.name}</h2>
          <div className="company__CompnayInfo">
            <small className="text-muted">
              <BiMap /> {company?.address}
            </small>
            <br />
            <small className="text-muted">
              <FcContacts /> {company?.contact}
            </small>
          </div>
        </div>
        <div className="col-3">
          <img
            style={{ width: "200px", border: "2px solid #000" }}
            className="companydetail__companyProfilePicture"
            src={`https://ka-mao.xyz/${company?.image}`}
          />
        </div>
      </div>
      <div className="row p-1">
        {company?.links.map((link) => (
          <Card
            {...{
              className: "p-2",
              render: () => (
                <p>
                  {link.name} : <a href={link.url}>{link.url}</a>
                </p>
              ),
            }}
          />
        ))}
      </div>
      <div>
        <button
          className="btn btn-danger mx-2"
          onClick={(e) => {
            async function removeACompanyFunction() {
              if (window.confirm(`Do you wish to delete ${company?.name}`)) {
                await deleteOneCompany({ id: companyId });
                notify("success", "Company deleted");
                setDataVersion(-1);
              }
            }
            removeACompanyFunction();
          }}
        >
          Delete
        </button>
      </div>
      <div className="my-5">
        <h2>Edit Company : {company.name}</h2>
        <hr className="my-2"></hr>
        <CompanyForm
          {...{
            submitButtonText: "Update Company",
            onSubmit: (values: any) => {
              const fData: FormData = objectToFormData(values);
              async function updateCompanyFunction() {
                if (values.company_image instanceof File) {
                  fData.set(
                    "company_image",
                    values.company_image,
                    values.company_image
                  );
                } else {
                  fData.delete("company_image");
                }

                await updateCompany({ id: companyId, fData: fData });
                notify("success", "Company updated");

                setDataVersion(dataVersion + 1);
              }
              updateCompanyFunction();
            },
            initialValues: {
              name: company?.name || "",
              contact: company?.contact || "",
              address: company?.address || "",
              links: company?.links || [],
              image: company?.image || [],
            },
          }}
        />
      </div>
    </div>
  );
};

export default CompanyDetailPage;
