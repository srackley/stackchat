import React, { Component } from 'react';
import axios from 'axios';
import store, { writeMessage, gotNewMesssageFromServer } from '../Store';

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

  handleChange(event) {
    const action = writeMessage(event.target.value);
    store.dispatch(action);
    console.log(store.getState());
  }

  handleSubmit(event) {
    event.preventDefault();
    const content = this.state.newMessageEntry;
    const { channelId } = this.props;
    axios.post('/api/messages', { content, channelId })
      .then(res => res.data)
      .then(message => store.dispatch(gotNewMesssageFromServer(message)));
  }

  render() {
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
