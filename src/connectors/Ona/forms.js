import api from './api';
import { receiveForms, fetchFormsError } from './../../store/actions';

export const fetchAPIForms = (reqConfig, dispatch) => {
  return api(reqConfig).then(({ user, res }) => {
    if (!res.ok) {
      dispatch(fetchFormsError(user.detail));
    } else {
      dispatch(receiveForms(user));
    }
  }).catch(err => console.log("Error: ", err));
};

export default {
  fetchAPIForms,
};