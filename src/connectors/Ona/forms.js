import ONA from './ona';
import { receiveForms, fetchFormsError, receiveFormFields } from './../../store/actions';

export const fetchAPIForms = (reqConfig, dispatch) => {
  return ONA.API.fetch(reqConfig, user => {
    try {
      if (user.detail) {
        dispatch(fetchFormsError(user.detail));
      } else {
        dispatch(receiveForms(user));
      }
    } catch (e) {
      return false;
    }
  });
};

export const fetchFormFields = (reqConfig, dispatch) => {
  return ONA.API.fetch(reqConfig, user => {
    try {
      if (user.detail) {
        dispatch(fetchFormsError(user.detail));
      } else {
        dispatch(receiveFormFields(user));
      }
    } catch (e) {
      return false;
    }
  });
};

export default {
  fetchAPIForms,
  fetchFormFields
};