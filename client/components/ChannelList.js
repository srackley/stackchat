import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< HEAD
import store from '../store';
=======
import store, { fetchChannels } from '../store';
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

export default class ChannelList extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }


  componentDidMount() {
    const thunk = fetchChannels();
    store.dispatch(thunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
<<<<<<< HEAD

    const { messages } = this.state;

=======
  let messages = this.state.messages;
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span># really_random</span>
<<<<<<< HEAD
            <span className="badge">{ messages.filter(message => message.channelId === 1).length }</span>
=======
            <span className="badge">{messages.filter(message => message.channelId === 1).length}</span>
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
<<<<<<< HEAD
            <span className="badge">{ messages.filter(message => message.channelId === 2).length }</span>
=======
            <span className="badge">{messages.filter(message => message.channelId === 2).length}</span>
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active">
            <span># dogs_of_fullstack</span>
<<<<<<< HEAD
            <span className="badge">{ messages.filter(message => message.channelId === 3).length }</span>
=======
            <span className="badge">{messages.filter(message => message.channelId === 3).length}</span>
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
<<<<<<< HEAD
            <span className="badge">{ messages.filter(message => message.channelId === 4).length }</span>
=======
            <span className="badge">{messages.filter(message => message.channelId === 4).length}</span>
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-channel">Create a channel...</NavLink>
        </li>
      </ul>
    );
  }
}

/** Write your `connect` component below! **/
