import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";


export async function getprofile(){
    return await http.get(apiEndpoint+ "/customer/profile");
}

export async function getAllService(){

    return await http.get(apiEndpoint + "/serviceprovider/viewAll");
}
export async function getpostedtasks(){

    return await http.get(apiEndpoint + "/customer/postedtasks");
}
export async function getactivetasks(){

    return await http.get(apiEndpoint + "/customer/activetasks");
}
export async function getServicebbytype(type){
    return await http.post(apiEndpoint + "/serviceprovider/getServicebbytype",{type});

}