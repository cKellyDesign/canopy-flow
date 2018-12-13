// TEMBO CONNECTOR
// import { API } from './api';
import Actions from '../../store/actions';
import { parseCSV } from '../../helpers/utils';
import { apiHeaders, apiRequest, fetchAPI} from '../../helpers/api';


const apiBases = {
  dev: 'http://localhost:3030',
  prod: 'https://ona-tembo.herokuapp.com'
}

const apiBase = apiBases[window.location.hostname === 'localhost' ? 'dev' : 'prod'];
if (window.location.search) {
  // todo - parse search params, check for prodTembo to test production urls locally
}

// Map of Tembo API Endpoints
const apiMap = {
  flows: `${apiBase}/flows`,
  newFlow: `${apiBase}/flows/new`,
  getFlow: `${apiBase}/flow/`,
  putFlow: `${apiBase}/flow/`,
  triggerFlow: `${apiBase}/flow/`, // requires config.extraPath with `${form_id}/pull`
};

// Tembo Specific API fetching function
const apiFetch = async (config, callback) => 
  fetchAPI(config, apiMap)
  .then((res) => { // handle Tembo API response
    const timeOfLogin = Number(localStorage.getItem('time_of_login'));
    const getTokenExpiry = Number(localStorage.getItem('expires_in')) || null;
    const expectedExpiryTime = timeOfLogin + getTokenExpiry;
    if (!res.ok) {
      const { dispatch } = config;
      if (res.status === 404 && getTokenExpiry && expectedExpiryTime <= new Date().getTime()) {
        dispatch(Actions.logoutUser());
      } else {
        switch (config.endpoint) {
        //   case 'forms':
        //     dispatch(Actions.fetchFormsError('Unable to fetch form'));
        //     break;
          default:
            // handle tembo endpoint errors here
        }
        throw new Error(
          `Request failed, HTTP status ${res.status}`,
        );
      }
    } else {
      // Define response parse method
      let parse;
      switch (config.mimeType) {
      case 'text/csv':
        parse = 'text';
        break;
      case 'image/jpeg':
        parse = 'blob';
        break;
      default:
        parse = 'json';
      }

      // Return parsed Response
      return res[parse]().then((parsed) => {
        // if parsed text is CSV then return Papaparse via parseCSV
        if (config.mimeType === 'text/csv') return { body: parseCSV(parsed) };
        return parsed;
      }).catch(e => e); // return error
    }
  })
  .then((callback || (body => body))) // execute callback or return response body
  .catch(e => e); // return error





class API {
  constructor() {
    this.apiHeaders = apiHeaders;
    this.apiRequest = apiRequest;
    this.fetchAPI = fetchAPI;
    this.fetch = apiFetch;
  }
}

const TEMBO = { API: new API() };

export default TEMBO;
