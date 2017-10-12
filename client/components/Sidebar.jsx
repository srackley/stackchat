import React from 'react';
import ChannelList from './ChannelList';

export default function Sidebar() {
  return (
    <sidebar>
      <div className="sidebar-header">
        <h3 href="#">
          <div>Stack Chat</div>
          <i alt="Brand" className="glyphicon glyphicon-comment" />
        </h3>
      </div>
      <h5>Channels</h5>
      <ChannelList />
    </sidebar>
  );
}
