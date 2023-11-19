import axios from "axios";

export const httpGET = async (url, params) => {
  // const token = decryptData(localStorage.getItem('token'));
  // const myHeaders = {
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  //   params: params && params,
  // };
  const data = await axios.get(url);
  return data;
};
