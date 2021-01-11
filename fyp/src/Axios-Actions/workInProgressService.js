import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function getAllTaskofS() {
    return await http.get(apiEndpoint + "/postTask/viewS")
}

export async function workInProgress(taskid) {
    console.log(taskid);
    return await http.put(apiEndpoint + "/postTask/taskCompletion"+taskid)
}