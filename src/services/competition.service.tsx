import { httpRequest } from "./http.service";

const baseUrl: string = `https://ka-mao.xyz/competition`;

export async function getAllCompetition() {
  const data = await httpRequest({
    url: `${baseUrl}/all`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
}

export async function getOneCompetition({
  competitionId,
}: {
  competitionId: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}`,
    method: "GET",
    tokenProtected: false,
  });
  return data;
}

export async function addOneSponser({
  competitionId,
  companyId,
  sponser_type,
}: {
  competitionId: string;
  companyId: string;
  sponser_type: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}/add/sponser`,
    tokenProtected: true,
    method: "POST",
    body: {
      companyID: companyId,
      sponser_type,
    },
  });
  return data;
}

export async function editOneSponser({
  competitionId,
  sponserId,
  sponser_type,
}: {
  competitionId: string;
  sponserId: string;
  sponser_type: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}/update/sponser/${sponserId}`,
    tokenProtected: true,
    method: "PUT",
    body: {
      sponser_type,
    },
  });
  return data;
}

export async function removeSponser({
  competitionId,
  sponserID,
}: {
  competitionId: string;
  sponserID: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}/remove/sponser`,
    method: "POST",
    tokenProtected: true,
    body: {
      sponserID,
    },
  });
  return data;
}

export async function createCompetition({ fData }: { fData: FormData }) {
  const data = await httpRequest({
    url: `${baseUrl}/create`,
    method: "POST",
    tokenProtected: true,
    body: fData,
    multipartForm: true,
  });
  return data;
}

export async function updateCompetition({
  fData,
  competitionId,
}: {
  fData: FormData;
  competitionId: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}`,
    method: "PUT",
    tokenProtected: true,
    body: fData,
    multipartForm: true,
  });
  return data;
}

export async function deleteCompetition({
  competitionId,
}: {
  competitionId: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}`,
    method: "DELETE",
    tokenProtected: true,
  });
  return data;
}

export async function removeAPostFromCompetition({
  competitionId,
  postId,
}: {
  competitionId: string;
  postId: string;
}) {
  const data = await httpRequest({
    url: `${baseUrl}/${competitionId}/remove-post/${postId}`,
    method: "POST",
    tokenProtected: true,
  });
  return data;
}
