import { parse } from 'papaparse';

export const parseCSV = (text, config) => parse(text, (config || {
  header: true,
  skipEmptyLines: true,
})).data;

export const getParameterByName = (name) => {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
 
export const getAccessToken = () => {
  return getParameterByName('access_token');
}

export default {
  getAccessToken,
  getParameterByName,
  parseCSV,
};
