import React, { Component } from 'react';
import store, {gotNewMessageFromServer, writeMessage} from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    const action = writeMessage(evt.target.value);
    store.dispatch(action);
  }

  handleSubmit(evt) {
    const content = this.state.newMessageEntry,
          channelId = this.props.channelId;

    console.log('channelId:',channelId);

    axios.post('/api/messages', {
      content,
      channelId
    })
      .then(res => res.data)
      .then(message => {
        store.dispatch(gotNewMessageFromServer(message));
        socket.emit('new-message', message);
      });

    evt.preventDefault();
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
