import axios from "axios";

// attaches token to every path that uses this object
const authAxios = axios.create();
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token;
  return config;
});

// const signupUrl =
// 'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/signup'

export default {
  // user: {
  //   signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),
  //   login: credentials =>
  //     axios.post(loginUrl, { credentials }).then(res => res.data),
  //   persistUser: identity =>
  //     axios.post(persistUrl, { identity }).then(res => res.data)
  // }
};
