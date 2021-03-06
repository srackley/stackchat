import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import store, { fetchMessages } from '../Store';

export default class MessagesList extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    const thunk = fetchMessages();
    store.dispatch(thunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId);
    const { messages } = this.state;
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
