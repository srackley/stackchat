import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER',
      GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER',
      WRITE_MESSAGE = 'WRITE_MESSAGE',
      GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER',
      WRITE_NAME = 'WRITE_NAME';

export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

export function gotChannelsFromServer(channels) {
  return {
    type: GOT_CHANNELS_FROM_SERVER,
    channels
  }
}

export function writeMessage(inputContent) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  }
}

export function gotNewMessageFromServer(message) {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  }
}

export function writeName(name) {
  return {
    type: WRITE_NAME,
    name: name
  }
}

const initialState = {
  messages: [],
  newMessageEntry: '',
  channels: [],
  name: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    case GOT_CHANNELS_FROM_SERVER:
      return Object.assign({}, state, { channels: action.channels });
    case WRITE_MESSAGE:
      return Object.assign({}, state, { newMessageEntry: action.newMessageEntry });
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, state, { messages: state.messages.concat(action.message) });
    case WRITE_NAME:
      return Object.assign({}, state, { name: action.name });
    default:
      return state;
  }
}

export function fetchMessages(messages) {
  const thunk = (dispatch, getState) => {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = gotMessagesFromServer(messages);
        dispatch(action);
      });
  }
  return thunk;
}

export function postMessage(message) {
  const thunk = (dispatch, getState) => {

    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = gotNewMessageFromServer(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
    });
  }
  return thunk;
}

export function fetchChannels(channels) {
  const thunk = (dispatch, getState) => {
    return axios.get('/api/channels/')
        .then(res => res.data)
        .then(channels => {
          const action = gotChannelsFromServer(channels);
          dispatch(action);
        });
    }
  return thunk;
}


const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));
export default store;
