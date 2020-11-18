import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function getAllOrders() {
    return await http.get(apiEndpoint + "/customer/view")
}


export async function getAllWorks() {
    return await http.get(apiEndpoint + "/serviceprovider/view")
}

export async function getServiceProviderEmail(taskid) {
    console.log(taskid);
    return await http.get(apiEndpoint + "/serviceprovider/email"+taskid)
}
export async function getCustomerEmail(taskid) {
    console.log(taskid);
    return await http.get(apiEndpoint + "/customer/email"+taskid)
}