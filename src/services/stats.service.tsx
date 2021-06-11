import { httpRequest } from "./http.service";

// to get count of all the collections
const baseUrl = "https://ka-mao.xyz/stats/db/count";

export const statsCountDocument = async (url?: any) => {
  const data = httpRequest({
    url: baseUrl,
    method: "GET",
    tokenProtected: false,
  });
  return data;
};
