import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_DEV_APP_BASEURL;
axios.defaults.headers.common.Authorization = '';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const abortController = new AbortController();

// Request Interceptors
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error.toJSON());
    console.log(error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.toJSON());
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    // Do something with response error
    return Promise.reject(error);
  }
);

// Request Config: https://github.com/axios/axios#request-config

// Response Schema: https://github.com/axios/axios#response-schema

// Automatic serialization to URLSearchParams if the content-type header is set to "application/x-www-form-urlencoded": https://github.com/axios/axios#-automatic-serialization-to-urlsearchparams

// Axios supports automatic object serialization to a FormData object if the request Content-Type header is set to multipart/form-data. https://github.com/axios/axios#-automatic-serialization-to-formdata

// Axios supports both browser and node env to capture req upload/download progress https://github.com/axios/axios#-progress-capturing

// Download and upload rate limits can only be set for the http adapter (node.js): https://github.com/axios/axios#-rate-limiting

/* Best Practices
  - use spread operator for multiple URL param
    axios.get(‘/api’, {params: {…param1, …param2}}) instead of axios.get(‘/api’, {params: {param1: value1, param2: value2}}).
  - use async/await instead of .then() and .catch() 
  - use try/catch with async/await 
  - use axios interceptors to handle errors globally
  - cancel http request when user leaves the page -> https://axios-http.com/ar/docs/cancellation#:~:text=Cancellation-,AbortController,-Starting%20from%20v0.22.0
  
*/

export { abortController, axios };
