import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function getName(state = initialState.getName, action) {
  switch (action.type) {
    case types.LOAD_NAME:
      console.log("inside getName reducer");
      return action.getName;
    default:
      return state;
  }
}
