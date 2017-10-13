import io from 'socket.io-client';
<<<<<<< HEAD
import store, { getMessage } from './store';
=======
import store, { gotNewMessageFromServer } from './store';
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

});

socket.on('new-message', message => {
  store.dispatch(gotNewMessageFromServer(message));
});

export default socket;
