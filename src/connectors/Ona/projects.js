import ONA from './ona';
import Actions from '../../store/actions';

export const fetchProjects = (reqConfig, dispatch) => {
  return ONA.API.fetch(reqConfig, user => {
    try {
      if (user.detail) {
        dispatch(Actions.fetchProjectsError(user.detail))
      } else {
        dispatch(Actions.receiveProjects(user))        
      }
    } catch (e) {
      return false;
    }
  });
};

export const fetchProject = (reqConfig, dispatch) => {
  return ONA.API.fetch(reqConfig, user => {
    try {
      if (user.detail) {
        dispatch(Actions.fetchProjectError(user.detail))
      } else {
        dispatch(Actions.receiveProject(user))        
      }
    } catch (e) {
      return false;
    }
  });
};

export default {
  fetchProjects,
  fetchProject
};