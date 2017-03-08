import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Main (props) {

  const { children, params } = props;

  return (
    <div>
      <Sidebar />
      <Navbar channelId={params.channelId} />
      <main>
        { children }
      </main>
    </div>
  );
}
