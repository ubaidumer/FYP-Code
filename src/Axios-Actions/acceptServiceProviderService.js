import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"

export async function getAllTask() {
    return await http.get(apiEndpoint + "/postTask/fetch")
}
export async function accept(taskid) {
    return await http.put(apiEndpoint + "/postTask/acceptServiceProvider"+taskid)
}
export async function cancel(taskid) {
    return await http.put(apiEndpoint + "/postTask/cancelServiceProvider"+taskid)
}