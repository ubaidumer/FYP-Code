import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"


export async function addservice(firstname,lastname,email,servicetype,password,contactno) {
    
    return await http.post(apiEndpoint + "/admin/register", {firstname,lastname,email,servicetype,password,contactno});
}

export async function getdata(email){

    return await http.post(apiEndpoint+ "/serviceprovider/getdata",{email});

}
export async function edit(firstname,lastname,email,servicetype,password,contactno,esearchemail){

    return await http.put(apiEndpoint+"/serviceprovider/edit",{firstname,lastname,email,servicetype,password,contactno,esearchemail});
}
export async function del(dsearchemail){

    return await http.post(apiEndpoint+"/serviceprovider/del",{dsearchemail});
}
export async function delcc(csearchemail){

    return await http.post(apiEndpoint+"/customer/del",{csearchemail});
}
export async function viewc(){

    return await http.post(apiEndpoint+ "/admin/allrecordsC");

}
export async function views(){

    return await http.post(apiEndpoint+ "/admin/allrecordsS");

}

export async function viewcp(){

    return await http.post(apiEndpoint+ "/admin/allrecordsCp");

}
export async function viewsp(){

    return await http.post(apiEndpoint+ "/admin/allrecordsSp");

}
export async function viewo(){

    return await http.post(apiEndpoint+ "/admin/allrecordso");

}
export async function viewh(){

    return await http.post(apiEndpoint+ "/admin/allrecordsSh");

}
export async function getdeposits(){

    return await http.get(apiEndpoint+ "/admin/dep");
}