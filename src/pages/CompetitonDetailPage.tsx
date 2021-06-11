import React, { useContext, useState, useMemo } from "react";
import Counter from "../components/Counter/Counter";
import Std404 from "../components/Std404/Std404";
import Loader from "../components/Loader/Loader";
import ListDisplay from "../components/ListDisplay/ListDisplay";

import Card from "../components/Card/Card";
import CompetitionSponserForm from "../components/Form/CompetitionSponserForm";
import CompetitionForm from "../components/Form/CompetitionForm";
import Table from "../components/Table/Table";
import Post from "../components/Post/Post";

import { useHttpObject } from "../hooks/useHttp";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getAllCompanies } from "../services/company.service";
import { DataContext } from "../contexts/DataContext";
import { notify } from "../utils/toaster";
import { AiOutlineUser } from "react-icons/ai";
import { BiFilm } from "react-icons/bi";
import { Redirect, useParams } from "react-router";
import {
  addOneSponser,
  deleteCompetition,
  editOneSponser,
  getOneCompetition,
  removeSponser,
  updateCompetition,
} from "../services/competition.service";
import "./compeditiondetail.css";

interface UrlPropsType {
  compId: string | undefined;
}

const isActive: (startDate: string, endDate: string) => boolean = (
  startDate: string,
  endDate: string
) => {
  const startDateInDateFormat = new Date(startDate);
  const endDateInDateFormat = new Date(endDate);
  const dateNow = new Date();
  return dateNow > startDateInDateFormat && dateNow < endDateInDateFormat;
};

const CompetitonDetailPage = () => {
  const [competitionId, setCompetitionId] = useState<string>(
    useParams<UrlPropsType>().compId || "some"
  );
  const [sponserToEdit, setSponserToEdit] = useState<string>("");
  const [isEditFormVisisble, setIsEditFormVisisble] = useState<boolean>(false);
  const [selectedSponserType, setSelectedSponserType] = useState<string>("");
  const [sponserCompanyName, setSponserCompanyName] = useState<string>("");
  const [showAddSponser, setShowAddSponser] = useState<boolean>(false);
  const [dataVersion, setDataVersion] = useState<number>(1);
  const [showEditCompetitionForm, setShowEditCompetitionForm] =
    useState<boolean>(false);

  const data = useContext(DataContext);

  const [postPopUp, setPostPopUp] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });

  const { data: competition, error: competitionError } = useHttpObject<
    Competition.CompeitionInterface,
    { competitionId: string }
  >(getOneCompetition, { competitionId }, `${competitionId} -- ${dataVersion}`);

  const { data: allcompanies, error: companiesError } = useHttpObject<
    Company.CompanyInterface[],
    null
  >(getAllCompanies, null, `121212`);

  const columns = useMemo(
    () => [
      {
        Header: "Uploaded By",
        accessor: "user.name",
      },
      {
        Header: "Total Views",
        accessor: "views",
      },
      {
        Header: "Total Likes",
        accessor: "totalLikes",
      },

      {
        Header: "Total Comments",
        accessor: "totalComments",
      },
      {
        Header: "Uploaded At",
        id: "created_at",
        accessor: ({ created_at }: { created_at: string }) => {
          return new Date(created_at).toDateString();
        },
      },
      {
        width: 250,
        Header: "Link",
        accessor: "_id",
        Cell: (values: any) => (
          <div>
            <button
              className="btn mx-1 btn-warning p-1 text-dark"
              onClick={(e) => {
                setPostPopUp({
                  ...postPopUp,
                  id: values.row.original._id,
                  show: true,
                });
              }}
            >
              View
            </button>
          </div>
        ),
      },
    ],
    []
  );

  if (competitionError?.error) {
    return (
      <Std404 {...{ message1: "404", message2: competitionError.error }} />
    );
  }
  if (!competition?._id) {
    return <Loader />;
  }

  if (dataVersion === -1) {
    return <Redirect to="/competition" />;
  }

  let isActiveCompetition: boolean = isActive(
    competition?.startDate || "",
    competition?.endDate || ""
  );

  const allCompaniesAsOption = allcompanies?.reduce(
    (
      accumulator: Record<string, string | number | boolean>[],
      currentValue: Company.CompanyInterface
    ) => {
      const companyOption: Record<string, string | any> = {};
      companyOption.value = currentValue?._id;
      companyOption.name = currentValue.name;
      accumulator.push(companyOption);
      return accumulator;
    },
    [
      {
        name: "Select a company",
        value: "",
        default: true,
      },
    ]
  );
  return (
    <>
      {postPopUp.show && (
        <Post
          show={postPopUp.show}
          setShow={() => {
            setPostPopUp({ ...postPopUp, id: "", show: false });
          }}
          _id={postPopUp.id}
        />
      )}
      <div>
        <div className="d-flex flex-wrap justify-content-between">
          <Counter
            {...{
              booleanDisplay: false,
              name: "Admins",
              Icon: AiOutlineUser,
              count: competition?.admins?.length || 0,
              gradientType:
                "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
            }}
          />
          <Counter
            {...{
              booleanDisplay: false,
              name: "Videos",
              Icon: BiFilm,
              count: competition?.posts?.length || 0,
              gradientType: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
            }}
          />
          <Counter
            {...{
              booleanDisplay: false,
              name: "Sponsers",
              Icon: AiOutlineUser,
              count: competition?.sponsors?.length || 0,
              gradientType:
                "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
            }}
          />
          <Counter
            {...{
              name: "Competition Active Status",
              count: -1,
              booleanField: isActiveCompetition,
              gradientType: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
            }}
          />
        </div>
        <div className="row justify-content-lg-between justify-content-sm-center my-4">
          <div className="col-11 my-2 col-lg-4 col-md-3 bg-custom-light competitionpage__leftBox">
            <h2>Members</h2>
            <hr />
            <ListDisplay {...{ data: competition?.admins, name: "Admins" }} />
            <ListDisplay {...{ data: competition?.editors, name: "Editors" }} />
            <ListDisplay
              {...{ data: competition?.moderators, name: "Moderators" }}
            />
          </div>
          <div className="col-11 my-2 col-lg-7 col-md-6 bg-custom-light competitionpage__rightBox">
            <div className="infoBox">
              <h1 className="competitionpage__competiionTitle my-2">
                {competition?.title}
              </h1>
              <div className="d-flex flex-wrap">
                {competition?.categories?.map((category) => (
                  <p className="competition__category mx-1">{category}</p>
                ))}
              </div>
              <small>
                Status : {isActiveCompetition ? "Active" : "Not Active"} <br />
                Starting Date :
                {new Date(competition?.startDate || "").toDateString()}
                <br />
                Ending Date:{" "}
                {new Date(competition?.endDate || "").toDateString()}
              </small>
              <hr />
              <div className="competitionpage__competitionDescription">
                <p>{competition?.description}</p>

                <div className="mt-4">
                  <button
                    className="btn btn-primary p-1 mx-1"
                    onClick={(e) => {
                      setShowEditCompetitionForm(!showEditCompetitionForm);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger p-1 mx-1"
                    onClick={(e) => {
                      async function deleteCompetitionFunction() {
                        await deleteCompetition({ competitionId });
                        notify("success", `${competition?.title} deleted`);
                        data.setter?.setDataVersion &&
                          data.setter?.setDataVersion();
                        setDataVersion(-1);
                      }

                      window.confirm("Do you want to delete the competition") &&
                        deleteCompetitionFunction();
                    }}
                  >
                    Delete
                  </button>
                </div>

                {showEditCompetitionForm && (
                  <div className="p-3">
                    <hr />
                    <CompetitionForm
                      {...{
                        submitValue: "Edit",
                        onSubmit: (values: any) => {
                          async function updateCompetiitionFunction() {
                            await updateCompetition({
                              competitionId,
                              ...values,
                            });
                            notify("success", "Competition Edited");
                            setDataVersion(dataVersion + 1);
                          }
                          updateCompetiitionFunction();
                        },
                        initialValues: {
                          title: competition?.title,
                          categories: competition?.categories,
                          startDate: competition?.startDate,
                          endDate: competition?.endDate,
                          description: competition?.description,
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="competitionDetail__sponsersContainer bg-custom-light p-3 rounded">
          <div className="d-flex justify-content-between">
            <h2>Sponsers</h2>

            <div>
              <button
                className={`${
                  !showAddSponser ? "btn btn-success p-1" : "btn btn-danger p-1"
                }`}
                onClick={(e) => {
                  setShowAddSponser(!showAddSponser);
                }}
              >
                {!showAddSponser ? "Add Sponser" : "Close Sponser"}
              </button>
            </div>
          </div>
          {showAddSponser && (
            <CompetitionSponserForm
              {...{
                allCompaniesAsOption,
                onSubmit: (values: any) => {
                  async function addOneSponserFunction() {
                    const dataObj: any = {
                      companyId: values.companyId,
                      competitionId,
                      sponser_type: values.sponser_type,
                    };

                    await addOneSponser(dataObj);
                    notify("success", "Sponser Added");
                    setShowAddSponser(false);
                    setDataVersion(dataVersion + 1);
                  }
                  addOneSponserFunction();
                },
              }}
            />
          )}
          <hr className="my-2" />
          <div className="d-flex flex-wrap">
            {competition?.sponsors?.map((sponser) => (
              <>
                {sponser?.company?._id && (
                  <Card
                    key={sponser?._id}
                    {...{
                      render: () => (
                        <div className="competitionDetail__sponserModal mx-3 p-2">
                          <img
                            src={`https://ka-mao.xyz/${sponser?.company?.image}`}
                            className="company__companyImage"
                          />
                          <br />
                          <h6>{sponser?.company?.name}</h6>
                          <hr /> {sponser?.sponser_type}
                          <hr className="my-1" />
                          <div className="competitionDetail__sponserModal__editControls d-flex justify-content-between">
                            <button
                              className="btn bg-custom-light"
                              onClick={(e) => {
                                setIsEditFormVisisble(true);
                                setSponserToEdit(sponser?._id || "");
                                setSponserCompanyName(sponser?.company?._id);
                                setSelectedSponserType(sponser?.sponser_type);
                              }}
                            >
                              <BiEditAlt />
                            </button>
                            <button
                              onClick={(e) => {
                                async function removeSponserDecorator() {
                                  if (
                                    window.confirm(
                                      `Remove ${sponser.company.name} as ${sponser.sponser_type}`
                                    )
                                  ) {
                                    const data = await removeSponser({
                                      competitionId,
                                      sponserID: sponser._id || "",
                                    });
                                    notify("success", "Sponser Removed");
                                    setDataVersion(dataVersion + 1);
                                    return data;
                                  }
                                }
                                removeSponserDecorator();
                              }}
                              className="btn btn-danger"
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </div>
                      ),
                    }}
                  />
                )}
              </>
            ))}
          </div>
          {isEditFormVisisble && (
            <>
              <hr className="my-5"></hr>
              <div className="editSponserFormContainer">
                <h3 className="my-2">Edit Sponser</h3>
                <CompetitionSponserForm
                  {...{
                    allCompaniesAsOption,
                    sponserToEdit,
                    companyId: sponserCompanyName,
                    sponser_type: selectedSponserType,
                    onSubmit: (values: any) => {
                      async function editOneSponserFunction() {
                        const dataObj: any = {
                          competitionId,
                          sponserId: sponserToEdit,
                          sponser_type: values.sponser_type,
                        };
                        notify("success", "Sponser Type Edited");
                        await editOneSponser(dataObj);
                        setShowAddSponser(false);
                        setDataVersion(dataVersion + 1);
                        setIsEditFormVisisble(false);
                      }
                      editOneSponserFunction();
                    },
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="my-4">
          <Table
            {...{
              columns,
              defaultSort: "views",
              openLink: false,
              sortableFields: [
                "created_at",
                "user.name",
                "views",
                "totalLikes",
                "totalComments",
              ],
              url: "https://ka-mao.xyz/post/all",
              type: "ALL POSTS IN COMPETITION",
              keys: [
                "created_at",
                "user.name",
                "views",
                "totalLikes",
                "totalComments",
              ],
              urlParams: [
                {
                  name: "sort_by",
                  defaultValue: "views",
                },
                {
                  name: "order",
                  defaultValue: "DSC",
                },
                {
                  name: "plimit",
                  as: "limit",
                  defaultValue: 10,
                },
                { name: "comp_id", defaultValue: competitionId },
                {
                  name: "pskip",
                  as: "skip",
                  defaultValue: 0,
                },
              ],
              onLimitChange: (
                urlParams: any,
                setUrlParams: (params: any) => void,
                targetValue: number
              ) => {
                setUrlParams({
                  ...urlParams,
                  plimit: targetValue,
                });
              },
              onSkipChange: (
                urlParams: any,
                setUrlParams: (params: any) => void,
                targetValue: number
              ) => {
                setUrlParams({
                  ...urlParams,
                  pskip: targetValue,
                });
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CompetitonDetailPage;
