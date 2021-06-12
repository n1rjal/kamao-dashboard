declare module Post {
  interface PostInterface {
    [readonly _id: string]: string;
    views: number;
    created_at: string;
    user?: User.UserInterface;
    updated_at: string;
    totalLikes?: number;
    media?: any;
    totalComments?: number;
    comments?: CommentInterface[];
    likes?: User.UserInterface[];
    __v: number;
    competition: null | { title: string; _id: string };
  }

  interface CommentInterface {
    readonly _id: string;
    border?: boolean;
    user: User.UserInterface;
    body: string;
    updated_at: string;
    created_at: string;
    replies?: CommentInterface[];
  }

  interface GetAllPostParams {
    plimit?: number;
    pskip?: number;
  }
  interface GetPostByIdParams {
    _id: string;
    climit?: number;
    llimit?: number;
    cskip?: number;
    lskip?: number;
  }
  interface idInterface {
    _id: string;
  }
}
