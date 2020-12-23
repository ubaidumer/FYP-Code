import http from "./httpService";
const apiEndpoint = "http://localhost:5555/api";

export async function paymentbyCash() {
    return await http.get(apiEndpoint + "/payment/paymentbyCash");

  }
  export async function paymentbyCard() {
    return await http.get(apiEndpoint + "/payment/paymentbyCard");
  }
  export async function getAllTask() {
    return await http.get(apiEndpoint + "/payment/view")
}

export async function Payment(email,bill) {
  return await http.post(apiEndpoint + "/payment/pay",{email,bill});
} 