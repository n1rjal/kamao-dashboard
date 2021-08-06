import { useHttpObject } from "../../hooks/useHttp";
import {
  getUserProfile,
  getUserProfileById,
} from "../../services/user.service";
import Popup from "../Popup/Popup";

import "./Profile.css";

const Profile = ({
  id,
  show,
  setShow,
}: {
  id: string;
  show: boolean;
  setShow: () => void;
}) => {
  const {
    data: user,
    error,
    loading,
  } = useHttpObject<User.UserInterface, any>(
    getUserProfileById,
    { id },
    `${id}`
  );
  return (
    <Popup
      open={show}
      onClose={() => {
        setShow();
      }}
    >
      <>
        {loading && (
          <div className="loadingDiv">
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && (
          <>
            <div className="profile">
              <div className="d-flex justify-content-center my-3">
                {user?.profile_picture ? (
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={
                      user?.profile_picture.startsWith("https")
                        ? user.profile_picture
                        : `https://ka-mao.xyz/${user?.profile_picture}`
                    }
                  ></img>
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?size=128&name=${user?.name}&background=000&color=fff&rounded=true`}
                  ></img>
                )}
              </div>
              <div className="profile-content my-1">
                <h1 className="display-5">{user?.name}</h1>
                <p>{user?.bio}</p>

                {user?.created_at && (
                  <>
                    <small className="text-muted">
                      Followers : {user.followers}
                      <br />
                      Follwings: {user.followings}
                      <br />
                      Joined : {new Date(user?.created_at).toDateString()}
                    </small>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </Popup>
  );
};

export default Profile;
