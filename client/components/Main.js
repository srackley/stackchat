import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import NewChannelEntry from './NewChannelEntry'
import store, { fetchMessages, fetchChannels, fetchCurrentChannel } from '../store';

const onMessagesListEnter = (routeProps) => {
    const currentChannelThunk = fetchCurrentChannel(routeProps.match.params.channelId);
    store.dispatch(currentChannelThunk);
    return <MessagesList {...routeProps} />
};

export default class Main extends Component {

  componentDidMount () {
    const messagesThunk = fetchMessages();
    const channelsThunk = fetchChannels();
    store.dispatch(messagesThunk);
    store.dispatch(channelsThunk);
  }

  render () {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/new-channel" component={NewChannelEntry} />
            <Route path="/channels/:channelId" render={onMessagesListEnter} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    );
  }
}
