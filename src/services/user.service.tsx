// every tasks related to user and user tasks
import { httpRequest } from "./http.service";

const baseUrl = "https://ka-mao.xyz/user";

export const getUserProfileForToken = async () => {
  const data = await httpRequest({
    url: `${baseUrl}/token-user`,
    method: "GET",
    tokenProtected: true,
  });
  return data;
};

export const searchUser = async ({
  name,
  ulimit,
  uskip,
}: User.NameSearchParams) => {
  const data = await httpRequest({
    url: `${baseUrl}/search?name=${name}&ulimit=${ulimit}&uskip=${uskip}`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
};

export const getUserToken = async ({
  email,
  phone,
  password,
}: User.UserSigninParams) => {
  const data = await httpRequest({
    url: `${baseUrl}/signin`,
    method: "POST",
    tokenProtected: false,
    body: { email, phone, password },
  });
  return data;
};

export const refreshUserToken = async ({
  refreshToken,
}: User.refreshTokenParams) => {
  const data = await httpRequest({
    url: `${baseUrl}/token-refresh`,
    method: "POST",
    tokenProtected: false,
    body: { token: refreshToken },
  });
  return data;
};

export const getUserProfileById = async ({ id }: { id: string }) => {
  const data = await httpRequest({
    url: `${baseUrl}/${id}/profile`,
    method: "GET",
    tokenProtected: true,
  });
  return data;
};

export const getUserProfile = async () => {
  const data = await httpRequest({
    url: `${baseUrl}/token-user`,
    method: "GET",
    tokenProtected: true,
  });
  return data;
};
