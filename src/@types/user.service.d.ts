declare module User {
  interface userId {
    _id: string;
  }
  interface NameSearchParams {
    name: string;
    uskip: number;
    ulimit: number;
  }
  interface UserInterface {
    [readonly _id: string]: string;
    name?: string;
    bio?: string;
    profile_picture: string;
    created_at: string;
    updated_at: string;
    followers?: number;
    following?: number;
  }
  interface UserSigninParams {
    email?: string;
    phone?: string;
    password?: string;
  }

  interface refreshTokenParams {
    refreshToken: string;
  }

  interface tokenObjectInterface {
    token: {
      access: string;
      refresh: string;
    };
    readonly _id: string;
    email: string;
    phone: string;
  }
}
