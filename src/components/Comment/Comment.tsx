import React from "react";
import "./comment.css";

const Comment = ({
  user,
  created_at,
  body,
  _id,
  replies,
  border,
}: Post.CommentInterface) => {
  return (
    <div className={`${border ? "mt-2" : ""}`}>
      <>
        <div
          className={`d-flex commentContainer justify-content-start align-items-center`}
        >
          <span className={`${border ? "" : "borderTowardsLeft"}`}></span>
          <img
            className="mx-2"
            src={
              user?.profile_picture
                ? user.profile_picture.startsWith("https")
                  ? user.profile_picture
                  : `https:ka-mao.xyz/${user.profile_picture}`
                : `https://ui-avatars.com/api/?size=128&name=${user.name}&background=000&color=fff&rounded=true`
            }
            width="50px"
            height="50px"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <small className="text-muted">{user.name}</small>
            <br />
            <small className="text-muted">
              {new Date(created_at).toDateString()}
            </small>
            <p>{body}</p>
          </div>
        </div>
        <div className="mx-4 d-flex justify-content-right">
          <div
            className={`${border && replies?.length ? "commentLeftSide" : ""} `}
          ></div>
          <div>
            {replies &&
              replies.map(
                ({
                  user,
                  created_at,
                  body,
                  _id,
                  updated_at,
                }: Post.CommentInterface) => (
                  <Comment
                    user={user}
                    updated_at={updated_at}
                    created_at={created_at}
                    body={body}
                    _id={_id}
                  />
                )
              )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Comment;
