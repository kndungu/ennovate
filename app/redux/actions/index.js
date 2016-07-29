import request from 'superagent';
import constants from '../constants';

export function logInUser(username, password) {
  request
    .post('api/users/login')
    .send({
      username,
      password
    })
    .end((error, response) => {
      if (error) {
        return ({
          type: constants.LOG_IN_USER_FAILURE,
          payload: {
            error
          }
        });
      }
      localStorage.setItem('token', response.body.token);
      return ({
        type: constants.LOG_IN_USER_SUCCESS,
        payload: {
          token: response.body.token
        }
      });
    });
}

export function fetchDocuments(callback) {
  request.get('api/documents')
    .end((error, response) => {
      return callback({
        type: 'FETCHED_DOCUMENTS',
        payload: response.body
      });
    });
}

