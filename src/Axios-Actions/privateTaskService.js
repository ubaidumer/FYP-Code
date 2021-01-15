import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"


export async function PostATask(title,servicetype,location,perhour,permonth,pertask,starttime,endtime,month,description,serviceprovider) {

    if(!perhour){
    perhour=0;
    }
    if(!permonth){
        permonth=0;
    }
    if(!pertask){
    pertask=0;
    }
    
        return await http.post(apiEndpoint + "/privateTask/pTask", {title,servicetype,location,perhour,permonth,pertask,starttime,endtime,month,description,serviceprovider});
    }
    export async function getAllTask() {
        return await http.get(apiEndpoint + "/privateTask/view")
    }
    export async function acceptRequest(taskid) {
        return await http.put(apiEndpoint + "/privateTask/acceptTask",{taskid})
    }
    export async function rejectRequest(taskid) {
        return await http.put(apiEndpoint + "/privateTask/rejectTask",{taskid})
    }
    
    
export async function viewTask() {
    return await http.get(apiEndpoint + "/privateTask/fetch")
}
export async function accept(taskid) {
    return await http.put(apiEndpoint + "/privateTask/acceptServiceProvider"+taskid)
}
export async function cancel(taskid) {
    return await http.put(apiEndpoint + "/privateTask/cancelServiceProvider",{taskid})
}