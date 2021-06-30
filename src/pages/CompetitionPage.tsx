import { useContext, useState, useMemo, useEffect } from "react";

import { DataContext } from "../contexts/DataContext";
import Table from "../components/Table/Table";
import CompetitionForm from "../components/Form/CompetitionForm";
import { createCompetition } from "../services/competition.service";
import { notify } from "../utils/toaster";
import useQuery from "../hooks/useQuery";
import { objectToFormData } from "../utils/objectToFormData";

const CompetitionPage = (props: any) => {
  const data = useContext(DataContext);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  let showAddBool = !!useQuery().get("addnew");
  useEffect(() => {
    setShowCreateForm(showAddBool);
  }, [showAddBool]);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <div>
          <h1>Competition</h1>
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={(e) => setShowCreateForm(!showCreateForm)}
          >
            Create Competition
          </button>
        </div>
      </div>
      {showCreateForm && (
        <div className="bg-white p-2">
          <CompetitionForm
            {...{
              onSubmit: (values: any) => {
                async function createCompetitionFunction() {
                  const fData: FormData = objectToFormData(values);
                  await createCompetition({ fData });
                  setShowCreateForm(!showCreateForm);
                  notify("success", "Competition Created");
                  data.setter?.setDataVersion && data.setter.setDataVersion();
                }
                createCompetitionFunction();
              },
            }}
          />
        </div>
      )}
      <div className="createForm"></div>
      <Table
        {...{
          openLink: true,
          columns: useMemo(
            () => [
              {
                Header: "Main Photo",
                id: "main_photo",
                accessor: ({
                  main_photo,
                  title,
                }: {
                  main_photo: string;
                  title: string;
                }) => {
                  return main_photo ? (
                    <img src={`${main_photo}`} width="40" height="40" />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?size=128&name=${title}&background=000&color=fff&rounded=true`}
                      width="40"
                      height="40"
                    />
                  );
                },
              },
              {
                Header: "Title",
                accessor: "title",
              },
              {
                Header: "Active",
                id: "isActive",
                accessor: ({ isActive }: { isActive: boolean }) => {
                  return isActive ? "✔️" : "❌";
                },
              },
              {
                Header: "Total Posts",
                accessor: "totalPosts",
              },
              {
                Header: "Total Sponsers",
                accessor: "totalSponsers",
              },
              {
                Header: "Total Organizers",
                accessor: ({
                  totalAdmins,
                  totalEditors,
                  totalModerators,
                }: {
                  totalAdmins: number;
                  totalEditors: number;
                  totalModerators: number;
                }) => totalAdmins + totalEditors + totalModerators,
              },
              {
                Header: "Starting Date",
                id: "startDate",
                accessor: ({ startDate }: { startDate: string }) => {
                  return new Date(startDate).toDateString();
                },
              },
              {
                Header: "Ending Date",
                id: "endDate",
                accessor: ({ endDate }: { endDate: string }) => {
                  return new Date(endDate).toDateString();
                },
              },
              {
                Header: "Created at",
                id: "created_at",
                accessor: ({ created_at }: { created_at: string }) => {
                  return new Date(created_at).toDateString();
                },
              },
            ],
            []
          ),
          url: "https://ka-mao.xyz/competition/all",
          type: "COMPETITION",
          urlParams: [
            {
              name: "sort_by",
              defaultValue: "title",
            },
            {
              name: "order",
              defaultValue: "DSC",
            },
            {
              name: "climit",
              as: "limit",
              defaultValue: 10,
            },
            {
              name: "cskip",
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
              climit: targetValue,
            });
          },
          onSkipChange: (
            urlParams: any,
            setUrlParams: (params: any) => void,
            targetValue: number
          ) => {
            setUrlParams({
              ...urlParams,
              cskip: targetValue,
            });
          },
        }}
      />
    </div>
  );
};

export default CompetitionPage;
