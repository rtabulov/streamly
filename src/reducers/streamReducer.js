import {
  CREATE_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  UPDATE_STREAM,
  FETCH_STREAMS,
} from '../actions/types';
import { omit, mapKeys } from 'lodash';

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return omit(state, action.payload);
    case UPDATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default streamReducer;
