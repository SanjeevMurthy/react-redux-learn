import * as types from './actionTypes';
import Api from '../api/Api';
export function loadNameSuccess(getName) {
  console.log("inside loadNameSuccess action");
  return { type: types.LOAD_NAME, getName};
}

export function loadName() {
  console.log("inside loadName action");
  return function(dispatch) {
    return Api.getName().then(getName => {
      dispatch(loadNameSuccess(getName));
    }).catch(error => {
      throw(error);
    });
  };
}
