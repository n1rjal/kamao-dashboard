import { BiUserCircle } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { DataContext } from "../../contexts/DataContext";
import { getUserToken } from "../../services/user.service";
import "./login.css";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const data = useContext(DataContext);

  const loginFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: response, error } = await getUserToken({
      email,
      password,
      phone: "",
    });
    if (error?.error) {
      setError("Invalid name or password");
    } else {
      data.setter?.setUserToken(response);
      data.setter?.setIsLoggedIn(true);
    }
  };

  return (
    <div className="loginBox__loginContainer d-flex justify-content-center align-items-center">
      <form onSubmit={loginFunction} className="p-3 form loginBox__loginForm">
        <BiUserCircle style={{ fontSize: "50px" }} />
        <h1 className="my-2">LOGIN</h1>
        {error && (
          <div className="error bg-danger p-1 text-light rounded">
            <AiFillWarning /> {error}
          </div>
        )}

        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="loginBox__inputBox p-1 my-2 pl-2"
          placeholder="Email or Phone"
        />
        <br />
        <input
          type="password"
          className="loginBox__inputBox p-1 my-2 pl-2"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <div className="upperCase">
          <input
            type="submit"
            className="btn btn-success my-2"
            value="Log In"
          />
          <hr />
          <h2>Or </h2>
          <p>Login With</p>
          <div>
            <a href="#">
              <FaFacebook className="loginBox__alternate_login mx-1" />
            </a>
            <a href="#">
              <FcGoogle className="loginBox__alternate_login mx-1" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
