import jwtDecode from "jwt-decode";
import http from "./httpService";

//import { apiUrl } from "../config.json";
//const apiEndpoint = apiUrl + "/auth";
const apiEndpoint = "http://localhost:5555/api";
const tokenKey = "token";

http.setJwt(getJwt());

export async function AdminLogin(email, password) {

  return await http.post(apiEndpoint + "/admin/login", { email, password });
}
export async function ServiceProviderLogin(email, password) {
  return await http.post(apiEndpoint + "/serviceprovider/login", { email, password });
}
export async function CustomerLogin(email, password) {
    return await http.post(apiEndpoint + "/customer/login", { email, password });
}

export async function CustomerSignUp(
  firstname,
  lastname,
  email,
  password,
  contactno
) {
  return await http.post(apiEndpoint + "/customer/signup", {
    firstname,
    lastname,
    email,
    password,
    contactno
  });
}
export async function ServiceProviderSignUp(
    firstname,
    lastname,
    email,
    servicetype,
    password,
    contactno
  ) {
    return await http.post(apiEndpoint + "/serviceprovider/signup", {
      firstname,
      lastname,
      email,
      servicetype,
      password,
      contactno
    });
  }
  export async function csavelocation(lat,lng){
    return await http.post(apiEndpoint+"/customer/savelocation",{lat,lng});
}
export async function ssavelocation(lat,lng){
  return await http.post(apiEndpoint+"/serviceprovider/savelocation",{lat,lng});
}


  export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

