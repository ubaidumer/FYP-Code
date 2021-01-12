import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"

export async function getAllTaskofS() {
    return await http.get(apiEndpoint + "/postTask/viewS")
}

export async function workInProgress(taskid) {
    console.log(taskid);
    return await http.put(apiEndpoint + "/postTask/taskCompletion"+taskid)
}