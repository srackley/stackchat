import { createStore } from 'redux';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER',
      GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER',
      WRITE_MESSAGE = 'WRITE_MESSAGE',
      GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

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

const initialState = {
  messages: [],
  newMessageEntry: '',
  channels: []
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
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
