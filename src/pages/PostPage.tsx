import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { DataContext } from "../contexts/DataContext";

const PostPage = () => {
  const data = useContext(DataContext);
  return (
    <div>
      {data.posts?.map((post) => (
        <div className="row my-3 justify-content-between btn-custom-primary">
          <div className="col-lg-6 col-md-10 col-sm-10 my-md-sm-2">
            <div>
              <ReactPlayer
                url={`https://ka-mao.xyz/post/${post._id}/watch`}
                controls={true}
                loop={true}
                playing={false}
                loading={"lazy"}
                width={"100%"}
                stopOnUnmount={true}
                height={"100%"}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-10 col-sm-10 py-2 my-md-sm-2">
            <h4 className="title">{post.user?.name}</h4>
            <hr />
            <p className="description">
              {post.description.slice(0, 100) + "..."}
            </p>
            <div className="div">
              {post.totalLikes} Likes {"   "}
              {post.totalComments} Comments
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
