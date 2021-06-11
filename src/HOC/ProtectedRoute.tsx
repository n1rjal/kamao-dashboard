import LoginBox from "../components/LoginBox/LoginBox";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { notify } from "../utils/toaster";

const ProtectedRoute: ({ children }: any) => any = ({ children }) => {
  const data = useContext(DataContext);

  return data.isLoggedIn ? <div>{children}</div> : <LoginBox />;
};

export default ProtectedRoute;
