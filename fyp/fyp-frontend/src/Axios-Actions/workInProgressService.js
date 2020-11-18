import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function getAllTask() {
    return await http.get(apiEndpoint + "/postTask/view")
}

export async function workInProgress(taskid) {
    console.log(taskid);
    return await http.put(apiEndpoint + "/postTask/taskCompletion"+taskid)
}