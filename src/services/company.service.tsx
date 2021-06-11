import { httpRequest } from "./http.service";

const baseUrl = `https://ka-mao.xyz/company`;

export async function createOneComapny({ fData }: { fData: FormData }) {
  const data = await httpRequest({
    url: `${baseUrl}/create`,
    method: "POST",
    body: fData,
    multipartForm: true,
    tokenProtected: true,
  });
  return data;
}

export async function getAllCompanies() {
  const data = await httpRequest({
    url: `${baseUrl}/all`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
}

export async function getOneCompany({ id }: { id: string }) {
  const data = await httpRequest({
    url: `${baseUrl}/${id}`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
}

export async function updateCompany({
  id,
  fData,
}: {
  id: string;
  fData: FormData;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${id}`,
    method: "PUT",
    body: fData,
    tokenProtected: true,
    multipartForm: true,
  });
  return data;
}

export async function deleteOneCompany({ id }: { id: string }) {
  const data = await httpRequest({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    tokenProtected: true,
  });
  return data;
}
