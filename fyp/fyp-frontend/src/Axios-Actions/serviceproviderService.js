import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";


export async function getprofile(){
    return await http.get(apiEndpoint+ "/serviceprovider/profile");
}
export async function getacceptedtasks(){

    return await http.get(apiEndpoint + "/serviceprovider/acceptedtasks");
}
export async function getactivetasks(){

    return await http.get(apiEndpoint + "/serviceprovider/activetasks");
}