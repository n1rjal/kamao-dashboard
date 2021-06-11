import VideoLogo from "../../assets/video logo.svg";
import { Link } from "react-router-dom";
import "./std404.css";

const Std404 = ({
  message1,
  message2,
}: {
  message1: string;
  message2: string;
}) => {
  console.log(message1);
  return (
    <div className="containFullScreen">
      <div className="messageContainer text-center">
        <div className="d-flex">
          <h2 className="std404__std404ErrorMessage mx-2">{message1}</h2>
          <p className="errorMessage">{message2} </p>
        </div>
        <Link className="goHomeLink" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Std404;
