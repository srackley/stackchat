import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const AUTHOR_NAME = 'AUTHOR_NAME';


const initialState = {
  messages: [],
  newMessageEntry: '',
  author: '',
};

export const writeMessage = inputContent => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent,
});

export const gotNewMesssageFromServer = message => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message,
});

export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const authorName = inputContent => ({
  type: AUTHOR_NAME,
  author: inputContent,
});

export const fetchMessages = () => {
  return function thunk(dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then((messages) => {
        const action = gotMessagesFromServer(messages);
        dispatch(action);
      });
  }
}

export const postMessage = (content, channelId) => {
  return function thunk(dispatch) {
    return axios.post('/api/messages', { content, channelId })
    .then(res => res.data)
    .then(message => {
      dispatch(gotNewMesssageFromServer(message));
      socket.emit('new-message', message);
    });
  }
}

const middlewareHandler = applyMiddleware(loggerMiddleware, thunkMiddleware)

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {
        messages: action.messages,
      });
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, state, {
        messages: state.messages.concat([action.message]),
      });
    case WRITE_MESSAGE:
      return Object.assign({}, state, {
        newMessageEntry: action.newMessageEntry,
      });
    case AUTHOR_NAME:
      return Object.assign({}, state, {
        author: action.author,
      });
    default:
      return state;
  }
}

const store = createStore(reducer, middlewareHandler);
export default store;
