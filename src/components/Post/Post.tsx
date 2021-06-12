import React, { useEffect, useState } from "react";
import { useHttpObject } from "../../hooks/useHttp";
import { getPostById } from "../../services/posts.service";
import Comment from "../Comment/Comment";
import Popup from "../Popup/Popup";
import "./post.css";

const Post = ({
  _id,
  show,
  setShow,
}: {
  _id: string;
  show: boolean;
  setShow: () => void;
}) => {
  const {
    data: post,
    error,
    loading,
  } = useHttpObject<Post.PostInterface, Post.GetPostByIdParams>(
    getPostById,
    {
      _id,
    },
    `${_id}`
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
          <div className="my-2">
            <div className="row p-2 justify-content-lg-between align-items-center justify-content-sm-center">
              <div className="col-12 col-sm-12 col-lg">
                <video
                  autoPlay
                  poster={
                    post?.media?.thumbnail_gif
                      ? `https://ka-mao.xyz/${post?.media?.thumbnail_gif || ""}`
                      : `https://i.pinimg.com/originals/43/3d/83/433d83f7e481f35245f8c6bb7c7591d8.gif`
                  }
                  id="videoPlayer"
                  playsInline
                  controlsList="nodownload"
                  src={`https://ka-mao.xyz/post/${post?._id || ""}/watch`}
                  controls
                ></video>
              </div>
              <div className="col-12 col-sm-12 col-lg align-item-start">
                <div className="my-2">
                  <div className="description">{post?.description}</div>
                  <h5 className="my-3">{post?.user?.name || ""}</h5>
                  <small className="text-muted">
                    {new Date(post?.created_at || "").toDateString()}
                  </small>
                  <br />
                  <small className="text-muted">👁️ {post?.views}</small>
                </div>
                <div className="my-2">
                  <button className="btn btn-danger p-1">Remove</button>
                </div>
              </div>
            </div>

            <div className="row my-3">
              <h5>Comments</h5>
              {!post?.comments?.length ? (
                <small>No comments</small>
              ) : (
                post?.comments?.map(
                  ({
                    _id,
                    body,
                    user,
                    created_at,
                    replies,
                    updated_at,
                  }: Post.CommentInterface) => (
                    <Comment
                      key={_id}
                      _id={_id}
                      updated_at={updated_at}
                      user={user}
                      border={true}
                      body={body}
                      created_at={created_at}
                      replies={replies}
                    />
                  )
                )
              )}
            </div>
          </div>
        )}
      </>
    </Popup>
  );
};

export default Post;
