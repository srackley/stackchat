import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import socket from './socket';

// INITIAL STATE

const initialState = {
  messages: [],
  channels: [],
  name: 'Reggie',
  newChannelEntry: '',
  newMessageEntry: '',
  currentChannel: ''
};

// ACTION TYPES

const UPDATE_NAME = 'UPDATE_NAME';
const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const WRITE_CHANNEL_NAME = 'WRITE_CHANNEL_NAME';
const GET_CHANNEL = 'GET_CHANNEL';
const GET_CHANNELS = 'GET_CHANNELS';
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';

// ACTION CREATORS

export function updateName (name) {
  const action = { type: UPDATE_NAME, name };
  return action;
}

export function getMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

export function writeMessage (content) {
  const action = { type: WRITE_MESSAGE, content };
  return action;
}

export function writeChannelName (channelName) {
  const action = { type: WRITE_CHANNEL_NAME, channelName };
  return action;
}

export function getChannel (channel) {
  const action = { type: GET_CHANNEL, channel };
  return action;
}

export function getChannels (channels) {
  const action = { type: GET_CHANNELS, channels };
  return action;
}

export function changeChannel (channelName) {
  const action = { type: CHANGE_CHANNEL, channelName };
  return action;
}

// THUNK CREATORS

export function fetchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      });
  };
}

export function postMessage (message) {

  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  };
}

export function fetchChannels () {

  return function thunk (dispatch) {
    return axios.get('/api/channels')
      .then(res => res.data)
      .then(channels => {
        const action = getChannels(channels);
        dispatch(action);
      });
  };
}

export function postChannel (channel) {

  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        dispatch(getChannel(newChannel));
        socket.emit('new-channel', newChannel);
      });
  };
}

export function fetchCurrentChannel (channelId) {

  return function thunk (dispatch) {
    return axios.get(`/api/channels/${channelId}`)
      .then(res => res.data)
      .then(channel => {
        dispatch(changeChannel(channel.name));
      });
  };
}

// REDUCER

function reducer (state = initialState, action) {

  switch (action.type) {

    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };

    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      };

    case WRITE_CHANNEL_NAME:
      return {
        ...state,
        newChannelEntry: action.channelName
      };

    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };

    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      };

    case CHANGE_CHANNEL:
      return {
        ...state,
        currentChannel: action.channelName
      };

    default:
      return state;
  }

}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;
