import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";


export async function getprofile(){
    return await http.get(apiEndpoint+ "/customer/profile");
}

export async function saveimage(imagestring){
    return await http.post(apiEndpoint+"/customer/upload",{imagestring});
}

export async function findp(id){

    return await http.post(apiEndpoint + "/serviceprovider/findpicture",{id});
}


export async function getAllService(){

    return await http.get(apiEndpoint + "/serviceprovider/viewAll");
}
export async function getpostedtasks(){

    return await http.get(apiEndpoint + "/customer/postedtasks");
}
export async function getactivetasks(){

    return await http.get(apiEndpoint + "/customer/activetasks");
}
export async function getServicebbytype(type){
    return await http.post(apiEndpoint + "/serviceprovider/getServicebbytype",{type});

}
export async function searchname(name){
    return await http.post(apiEndpoint + "/serviceprovider/searchbyname",{name});

}

export async function editdata(fname,lname,pass,contact){

    return await http.post(apiEndpoint+"/customer/edit",{fname,lname,pass,contact});
}
export async function findService(id){

    return await http.post(apiEndpoint+"/serviceprovider/searchbyid",{id});
}

export async function AllSprofiles(){

    return await http.get(apiEndpoint+"/serviceprovider/sp");
}

export async function oneprofile(servicetype){

    return await http.post(apiEndpoint+"/serviceprovider/gethim",{servicetype});
}
export async function delpost(id){

    return await http.post(apiEndpoint+"/postTask/delete",{id});
}
export async function editpost(title,servicetype,location,perhour,permonth,pertask,start,end,month,description,id){

    if(!perhour){
        perhour=0;
        }
        if(!permonth){
            permonth=0;
        }
        if(!pertask){
        pertask=0;
        }
    return await http.post(apiEndpoint+"/postTask/edit",{title,servicetype,location,perhour,permonth,pertask,start,end,month,description,id});
}


