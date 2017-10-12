import { createStore } from 'redux';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

const initialState = {
  messages: [],
  newMessageEntry: '',
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
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
