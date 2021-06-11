import { ReactChild, ReactChildren } from "react";

declare module DataContext {
  type Provider =
    | ReactChildren[]
    | ReactChildren
    | ReactChild
    | ReactChild[]
    | null
    | undefined;

  interface Props {
    children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  }

  interface DocumentCountInterface {
    userCount: number;
    postCount: number;
    competitionCount: number;
    companyCount: number;
  }

  interface GlobalContextType {
    userProfile: User.UserInterface;
    posts: Post.PostInterface[];
    isLoggedIn: boolean;
    users: User.UserInterface[];
    userSearchQuery: string;
    competitions: Competition.CompeitionInterface[];
    documentCount: DocumentCountInterface;
    userToken: User.tokenObjectInterface;
    loading: boolean;
    setter: {
      setCompetitionLimit: (value: number) => void;
      setCompetitionSkip: (value: number) => void;
      setIsLoggedIn: (value: boolean) => void;
      setUserSearchQuery: (value: string) => void;
      setPostLimit: (value: number) => void;
      setPostSkip: (value: number) => void;
      setDataVersion: () => void;
      setUserSkip: (value: number) => void;
      setUserLimit: (value: number) => void;
      setUserToken: (value: User.tokenObjectInterface | {}) => void;
    };
    query: {
      climit: number;
      cskip: number;
      plimit: number;
      pskip: number;
      uskip: number;
      ulimit: number;
    };
  }
}
