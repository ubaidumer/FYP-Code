import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"

export async function getAllTask() {
    return await http.get(apiEndpoint + "/postTask/view")
}
export async function acceptRequest(taskid) {
    return await http.put(apiEndpoint + "/postTask/acceptTask"+taskid)
}
  