// Map of ONA API Endpoints
var apiMap = {
  user: 'https://api.ona.io/api/v1/user'
};

// Generate Headers for API Fetch
var apiHeaders = (config) => {
  const headers = new Headers();
  // headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,mode,Authorization');
  // headers.append('Access-Control-Allow-Origin', '*')
  // headers.append('mode', 'no-cors');

  if (!config || !config.token) return headers;

  headers.append('Authorization', `Bearer ${config.token}`)
  return headers;
};

// Generate Request for API Fetch
var apiRequest = (config, headers) => {
  const reqConfig = { method: config.method || 'GET' };
  if (headers) reqConfig.headers = headers;

  let apiPath = apiMap[config.endpoint];
  if (config.params) apiPath = `${apiPath}?${config.params}`;

  return new Request(apiPath, reqConfig)
};

// Generate API Fetch Promise
var fetchAPI = (config) => {
  return fetch(apiRequest(config, apiHeaders(config)));
};

// Resolve API Fetch Promise, convert to JSON, handle with callback/resolve as JSON
// config          - (required) Object contaig options / credentials
// config.token    - (required) Access_Token provided by ONA Authorization
// config.endpoint - (required) API Key to determine API Path
// config.method   - (optional) Specify HTTP Method (defaults to GET)
// config.params   - (optional) Additional parameters to be appeneded to API Path
// callback        - (optional) Function to take JSON response, otherwise res is simply returned
export default (config, callback) => callback
  ? fetchAPI(config).then(res => res.json()).then(callback)
  : fetchAPI(config).then(res => res.json()).then(res => res);

// Slimed down variation:
// export default (config) => fetchAPI(config).then(res => res.json());

// Could work like:
// import API from './connectors/Ona/API';
// let user;
// API({ endpoint: 'user', token: this.state.access_token }).then(res => {
//   dispatch(...., res);
// });
