// Whoa?!? What is this?
// Thanks to the style-loader, sass-loader and css-loader, webpack allows us import scss,
// compiles it into css, and then auto-magically injects a <style> tag onto the DOM!
// Wowzers! Check out the webpack.config.js to see how to add them!
import './index.scss';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { Main, MessagesList, NewChannelEntry } from './components';
import store, { fetchMessages, fetchChannels } from './store';

function onMainEnter () {
  const messagesThunk = fetchMessages();
  const channelsThunk = fetchChannels();
  store.dispatch(messagesThunk);
  store.dispatch(channelsThunk);
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main} onEnter={onMainEnter}>
        <Route path="new-channel" component={NewChannelEntry} />
        <Route path="channels/:channelId" component={MessagesList} />
        <IndexRedirect to="channels/1" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
