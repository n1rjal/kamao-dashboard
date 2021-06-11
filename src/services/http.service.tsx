// to get count of all the collections
import axios, { CancelTokenSource } from "axios";

const baseUrl = "https://ka-mao.xyz/user";
// const baseUrl = "http://localhost:3001/user";

const refreshTokenUrl = `${baseUrl}/token-refresh`;

axios.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config;
    const errorObject = error.response?.data;
    const errorMessage = errorObject?.error;
    let tokenObj: any = localStorage.getItem("token");

    if (tokenObj) {
      tokenObj = JSON.parse(tokenObj);
      const accessToken: any = tokenObj?.token?.access;
      const refreshToken: any = tokenObj?.token?.refresh;
      const requestHasAccessToken: boolean =
        !!originalRequest?.headers?.Authorization?.includes(accessToken);
      const requestHasRefreshToken =
        !!originalRequest?.url?.includes(refreshTokenUrl);

      if (errorMessage === "jwt expired") {
        if (requestHasAccessToken) {
          return axios({
            url: refreshTokenUrl,
            method: "POST",
            data: {
              token: `${refreshToken}`,
            },
          }).then((response) => {
            tokenObj.token.access = response.data.token.access;
            localStorage.setItem("token", JSON.stringify(tokenObj));
            originalRequest.headers.Authorization = `Bearer ${response.data.token.access}`;
            return axios(originalRequest);
          });
        }

        if (requestHasRefreshToken) {
          localStorage.removeItem("token");
          alert("Refresh expired");
          window.location.reload();
        }
      }
    }
    return Promise.reject(error);
  }
);

export const actWithAuthToken: (
  action: "GET" | "SET",
  tokenObj?: User.tokenObjectInterface
) => User.tokenObjectInterface | undefined = (action, tokenObj) => {
  if (action === "GET") {
    const token: User.tokenObjectInterface | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    if (token) return token;
  }
  if (action === "SET") {
    if (tokenObj) {
      localStorage.setItem("token", JSON.stringify(tokenObj));
    }
  }
};

export const httpRequest = async (
  httpRequestParams: HttpRequest.ParamsInterface
) => {
  let data: any = {};
  let error: any = {};
  const headers: HttpRequest.HeaderInterface = {};
  const token: User.tokenObjectInterface | undefined = actWithAuthToken("GET");
  if (httpRequestParams.tokenProtected) {
    headers["Authorization"] = `Bearer ${token?.token?.access}`;
  }
  if (httpRequestParams.body) {
    if (httpRequestParams.multipartForm) {
      headers["Content-Type"] = "form-data/multipart";
    } else {
      headers["Content-Type"] = "application/json";
    }
  }

  try {
    let response = await axios({
      url: httpRequestParams.url,
      method: httpRequestParams.method,
      headers: headers,
      data: httpRequestParams.body,
    });

    data = await response.data;
  } catch (e) {
    error = e.response?.data;
  }
  return { data, error };
};
