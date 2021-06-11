import React from "react";
import "./listdisplay.css";

const ListDisplay = <T extends User.UserInterface | undefined>({
  data,
  name,
}: {
  data: T[] | undefined;
  name: string;
}) => {
  return (
    <div>
      <div className="competitionpage__items">
        <h4 className="my-2">{name}</h4>
        <ul className="listContainer">
          {data?.length ? (
            data?.map((admin: User.UserInterface | undefined) => (
              <div
                key={admin?._id}
                className="d-flex justify-content-between align-items-center competitionpage__item"
              >
                <div>
                  {admin?.profile_picture ? (
                    <img
                      src={admin.profile_picture}
                      className="competitionDetail__userImage"
                      alt=""
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?size=32&name=${admin?.name}&background=000&color=fff&rounded=true`}
                      className="competitionDetail__userImage"
                      alt="avatar of user"
                    />
                  )}
                </div>
                <h5 className="heading-5 m-1">{admin?.name}</h5>
              </div>
            ))
          ) : (
            <p className="mb-3">No {name}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListDisplay;
