import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";


export async function addservice(firstname,lastname,email,servicetype,password,contactno) {
    
    return await http.post(apiEndpoint + "/admin/register", {firstname,lastname,email,servicetype,password,contactno});
}

export async function getdata(email){

    console.log(email);
    return await http.post(apiEndpoint+ "/serviceprovider/getdata",{email});

}
export async function edit(firstname,lastname,email,servicetype,password,contactno,esearchemail){

    return await http.put(apiEndpoint+"/serviceprovider/edit",{firstname,lastname,email,servicetype,password,contactno,esearchemail});
}
export async function del(dsearchemail){

    return await http.post(apiEndpoint+"/serviceprovider/del",{dsearchemail});
}
