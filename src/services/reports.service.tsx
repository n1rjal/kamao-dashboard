import { httpRequest } from "./http.service";

const baseUrl="https://ka-mao.xyz/report";

export const getAllReports =async ({
    rlimit,
    rskip
}:{
    rlimit:number
    rskip:number
}) => {
    const data = await httpRequest({
        url:`${baseUrl}/is-open`,
        method:"GET",
        tokenProtected:true
    })
    return data;
};
