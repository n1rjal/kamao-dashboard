import React, { useState, useMemo } from "react";
import Post from "../Post/Post";
import Table from "./Table";
import Profile from "../Profile/Profile";

const GenerateTable = () => {
  const [postShow, setPostShow] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });
  const [userShow, setUserShow] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });
  return (
    <>
      {postShow.show && (
        <Post
          {...{
            _id: postShow.id,
            show: postShow.show,
            setShow: () => {
              setPostShow({ ...postShow, show: false });
            },
          }}
        />
      )}
      {userShow.show && (
        <Profile
          {...{
            id: userShow.id,
            show: userShow.show,
            setShow: () => {
              setUserShow({ ...userShow, show: false });
            },
          }}
        />
      )}
      <div>
        <Table
          {...{
            columns: useMemo(
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
                    <div className="">
                      <button
                        className="btn btn-warning text-dark p-1"
                        onClick={(e) => {
                          setPostShow({
                            ...postShow,
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
            ),
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
            type: "POST",
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
                defaultValue: "totalComments",
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

        <Table
          {...{
            columns: useMemo(
              () => [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Profile Picture",
                  id: "pp",
                  accessor: ({
                    profile_picture,
                    name,
                  }: {
                    profile_picture: string | null;
                    name: string;
                  }) =>
                    profile_picture ? (
                      <img
                        style={{ width: "64px", height: "64px" }}
                        src={
                          profile_picture.startsWith("https")
                            ? profile_picture
                            : `https://ka-mao.xyz/${profile_picture}`
                        }
                      ></img>
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?size=64&name=${name}&background=000&color=fff&rounded=true`}
                      ></img>
                    ),
                },
                {
                  Header: "Total Followers",
                  accessor: "followers",
                },

                {
                  Header: "Total Following",
                  accessor: "followings",
                },
                {
                  Header: "Joined Since",
                  id: "created_at",
                  accessor: ({ created_at }: { created_at: string }) => {
                    return new Date(created_at).toDateString();
                  },
                },
                {
                  Header: "",
                  id: "_id",
                  accessor: ({ _id }: { _id: string }) => (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setUserShow({
                          ...userShow,
                          id: _id,
                          show: true,
                        });
                      }}
                    >
                      View
                    </button>
                  ),
                },
              ],
              []
            ),
            openLink: false,
            url: "https://ka-mao.xyz/user/search",
            type: "USER",
            urlParams: [
              {
                name: "sort_by",
                defaultValue: "followers",
              },
              {
                name: "order",
                defaultValue: "DSC",
              },
              {
                name: "ulimit",
                as: "limit",
                defaultValue: 10,
              },
              {
                name: "uskip",
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
                ulimit: targetValue,
              });
            },
            onSkipChange: (
              urlParams: any,
              setUrlParams: (params: any) => void,
              targetValue: number
            ) => {
              setUrlParams({
                ...urlParams,
                uskip: targetValue,
              });
            },
          }}
        />

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
    </>
  );
};

export default GenerateTable;
