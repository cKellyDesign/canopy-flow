// Generate Headers for API Fetch
export const apiHeaders = (config) => {
  const headers = new Headers();

  if (config && config.mimeType) headers.append('Content-Type', config.mimeType);
  if (!config || !config.token) return headers;

  headers.append('Authorization', `Bearer ${config.token}`);
  return headers;
};

// Generate Request for API Fetch
export const apiRequest = (config, headers, apiMap) => {
  const reqConfig = { method: config.method || 'GET' };
  if (headers) reqConfig.headers = headers;
  if (config.body) reqConfig.body = config.body; // strigified payload
  if (config.mode) reqConfig.mode = config.mode; // cors or no-cors
  if (config.cache) reqConfig.cache = config.cache; // cache or no-cache

  let apiPath = apiMap[config.endpoint];
  if (config.extraPath) apiPath = `${apiPath}/${config.extraPath}`;
  if (config.params) apiPath = `${apiPath}?${config.params}`;

  return new Request(apiPath, reqConfig);
};

// Generate API Fetch Promise
export const fetchAPI = (config, apiMap) =>
  fetch(apiRequest(config, apiHeaders(config), apiMap));

export default {
  apiHeaders,
  apiRequest,
  fetchAPI,
};
