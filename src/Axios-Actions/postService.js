import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"

export async function PostATask(title,servicetype,location,perhour,permonth,pertask,starttime,endtime,month,description) {

if(!perhour){
perhour=0;
}
if(!permonth){
    permonth=0;
}
if(!pertask){
pertask=0;
}

    return await http.post(apiEndpoint + "/postTask/postTask", {title,servicetype,location,perhour,permonth,pertask,starttime,endtime,month,description});
}

  
  
  