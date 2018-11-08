import { parse } from 'papaparse';

export const parseCSV = (text, config) => parse(text, (config || {
  header: true,
  skipEmptyLines: true,
})).data;

export const getParameterByName = (name) => {
  const match = RegExp(`[#&]${name}=([^&]*)`).exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

export const getAccessToken = () => getParameterByName('access_token');

export const getTokenExpiry = () => getParameterByName('expires_in');

export default {
  getAccessToken,
  getTokenExpiry,
  getParameterByName,
  parseCSV,
};
