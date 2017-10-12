import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';

export default function Main() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main>
        <Switch>
          <Route path="/channels/:channelId" component={MessagesList} />
          <Redirect to="/channels/1" />
        </Switch>
      </main>
    </div>
  );
}
