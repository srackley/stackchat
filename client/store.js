import { createStore } from 'redux';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER';

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

const initialState = {
  messages: [],
  channels: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    case GOT_CHANNELS_FROM_SERVER:
      return Object.assign({}, state, { channels: action.channels });
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
