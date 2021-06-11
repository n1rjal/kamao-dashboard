// every tasks related to posts.service
import { httpRequest } from "./http.service";

const baseUrl = "https://ka-mao.xyz/post";

export const getAllPosts = async ({
  plimit = 10,
  pskip = 0,
}: Post.GetAllPostParams) => {
  const data = await httpRequest({
    url: `${baseUrl}/all?plimit=${plimit}&pskip=${pskip}`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
};

export const getPostById = async ({
  _id,
  llimit = 10,
  lskip = 0,
  climit = 10,
  cskip = 0,
}: Post.GetPostByIdParams) => {
  const data = await httpRequest({
    url: `${baseUrl}/${_id}?climit=${climit}&cskip=${cskip}&llimit=${llimit}&lskip=${lskip}`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
};

export const deletePostById = async ({ _id }: Post.idInterface) => {
  const data = await httpRequest({
    url: `${baseUrl}/${_id}`,
    method: "DELETE",
    tokenProtected: false,
  });
  return data;
};
