import React, { useEffect, useState, useMemo } from "react";
import { DataContext as DataContextInterface } from "../@types/DataContext";
import Loader from "../components/Loader/Loader";
import { useHttpArray, useHttpObject } from "../hooks/useHttp";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAllCompetition } from "../services/competition.service";
import { getAllPosts } from "../services/posts.service";
import { statsCountDocument } from "../services/stats.service";
import { getUserProfile, searchUser } from "../services/user.service";

const DataContext = React.createContext<
  Partial<DataContextInterface.GlobalContextType>
>({});

const DataContextProvider = ({ children }: DataContextInterface.Props) => {
  const [userSearchQuery, setUserSearchQuery] = useState<string>("");
  const [plimit, setPostLimit] = useState<number>(10);
  const [pskip, setPostSkip] = useState<number>(0);
  const [ulimit, setUserLimit] = useState<number>(10);
  const [uskip, setUserSkip] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [competitionLimit, setCompetitionLimit] = useState<number>(10);
  const [competitionSkip, setCompetitionSkip] = useState<number>(0);
  const [dataVersion, setDataVersion] = useState<number>(1);

  const [userToken, setUserToken] = useLocalStorage("token", {});

  const incrementDataVersion = () => {
    console.log("Data version increased");
    setDataVersion(dataVersion + 1);
  };

  useEffect(() => setIsLoggedIn(!!userToken?.token), []);

  const { data: userProfile, error: userProfileError } = useHttpObject<
    User.UserInterface,
    null
  >(getUserProfile, null, userToken?._id);
  const { data: users, error: userError } = useHttpArray<
    User.UserInterface,
    User.NameSearchParams
  >(
    searchUser,
    {
      name: userSearchQuery,
      ulimit,
      uskip,
    },
    `${userSearchQuery} - ${ulimit} - ${uskip} - ${dataVersion}`
  );
  const { data: documentCount, error: documentCountError } = useHttpObject<
    any,
    any
  >(statsCountDocument, null, `${userToken?._id} ${dataVersion}`);

  const { data: posts, error: postError } = useHttpArray<
    Post.PostInterface,
    Post.GetAllPostParams
  >(
    getAllPosts,
    {
      plimit,
      pskip,
    },
    `${plimit} - ${pskip} - ${dataVersion}`
  );

  const { data: competitions, error: competitionsError } = useHttpArray<
    Competition.CompeitionInterface,
    null
  >(
    getAllCompetition,
    null,
    `${competitionLimit} - ${competitionSkip} - ${dataVersion}`
  );

  useMemo(() => {
    if ((competitions && competitions.length >= 0) ?? undefined)
      setLoading(false);
  }, [competitions]);

  if (loading) {
    return <Loader />;
  }
  return (
    <DataContext.Provider
      value={{
        loading,
        userProfile,
        userToken,
        posts,
        isLoggedIn,
        users,
        competitions,
        userSearchQuery,
        documentCount,
        setter: {
          setIsLoggedIn,
          setPostLimit,
          setPostSkip,
          setUserLimit,
          setUserSkip,
          setUserToken,
          setCompetitionLimit,
          setCompetitionSkip,
          setDataVersion: incrementDataVersion,
          setUserSearchQuery,
        },
        query: {
          climit: competitionLimit,
          cskip: competitionSkip,
          plimit,
          ulimit,
          uskip,
          pskip,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };
export { DataContextProvider };
