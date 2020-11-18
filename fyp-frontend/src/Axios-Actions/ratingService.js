import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function getserviceInfo() {
    return await http.get(apiEndpoint + "/customer/info")
}
export async function getAllRating(i) {
    console.log(i);
    return await http.get(apiEndpoint + "/rating/view"+i)
}

export async function rate(rtitle,rreview,rstar,sid,se,id) {
    
        return await http.post(apiEndpoint + "/rating/rate", {rtitle,rreview,rstar,sid,se,id});
}