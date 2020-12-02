import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  UPDATE_STREAM,
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (id) => {
  return {
    type: SIGN_IN,
    payload: id,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  try {
    const { data } = await streams.post('/streams', {
      ...formValues,
      userId: getState().auth.id,
    });
    dispatch({ type: CREATE_STREAM, payload: data });
    history.push('/');
  } catch (e) {
    console.error(e);
  }
};

export const fetchStreams = () => async (dispatch) => {
  const { data } = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: data });
};

export const fetchStream = (id) => async (dispatch) => {
  const { data } = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: data });
};

export const updateStream = (id, formValues) => async (dispatch) => {
  const { data } = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: UPDATE_STREAM, payload: data });
  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
