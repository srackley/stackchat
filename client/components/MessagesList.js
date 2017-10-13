import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
<<<<<<< HEAD
import store from '../store';
=======
import store, { fetchMessages } from '../store';
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557

export default class Messages extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
<<<<<<< HEAD
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
=======
    const thunk = fetchMessages();
    store.dispatch(thunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}
