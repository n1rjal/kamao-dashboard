import React from "react";
import { BiBorderRadius } from "react-icons/bi";
import ReactPlayer from "react-player/lazy";
import { useHttpObject } from "../../hooks/useHttp";
import { removeAPostFromCompetition } from "../../services/competition.service";
import { notify } from "../../utils/toaster";

const PostDisplay = ({
  posts,
  competition,
  incDataV,
}: {
  posts: Post.PostInterface[];
  competition: Competition.CompeitionInterface;
  incDataV: () => void;
}) => {
  return (
    <div className="bg-custom-light p-3 mt-2">
      <h2>All Posts</h2>
      <small>in this competition</small>
      <div className="row my-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-dark col-11 col-md-4 col-lg-3 border-rounded text-light m-1 pb-3"
          >
            <ReactPlayer
              url={`https://ka-mao.xyz/post/${post._id}/watch`}
              controls={true}
              light={true}
              width={"100%"}
            ></ReactPlayer>
            <div className="details">
              <div>
                <h5>Post</h5>
                <img
                  src={
                    post?.user?.profile_picture
                      ? `https://ka-mao.xyz/${post?.user?.profile_picture}` ??
                        ""
                      : `https://ui-avatars.com/api/?size=128&name=${post.user?.name}&background=000&color=fff&rounded=true`
                  }
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h6>By {post?.user?.name ?? ""}</h6>
              <button
                onClick={(e) => {
                  async function removeAPostFromCompetitionFunction() {
                    await removeAPostFromCompetition({
                      competitionId: competition._id,
                      postId: post._id,
                    });
                  }
                  if (
                    window.confirm(
                      "Do you want to remove this post from competition"
                    )
                  ) {
                    removeAPostFromCompetitionFunction();
                    notify("success", "The post is removed");
                    incDataV();
                  }
                }}
                className=" p-1 btn btn-danger"
              >
                Remove this Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;
