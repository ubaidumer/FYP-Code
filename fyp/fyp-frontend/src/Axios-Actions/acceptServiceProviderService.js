import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function getAllTask() {
    return await http.get(apiEndpoint + "/postTask/fetch")
}
export async function accept(taskid) {
    return await http.put(apiEndpoint + "/postTask/acceptServiceProvider"+taskid)
}
export async function cancel(taskid) {
    return await http.put(apiEndpoint + "/postTask/cancelServiceProvider"+taskid)
}