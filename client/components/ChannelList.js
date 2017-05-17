import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function ChannelList (props) {

  const { messages, channels, changeChannel } = props;

  return (
    <ul>
      {
        channels.map(channel => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`}>
                <span># {channel.name}</span>
                <span className="badge">{ messages.filter(message => message.channelId === channel.id).length }</span>
              </NavLink>
            </li>
          );
        })
      }
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}

const mapStateToProps = function (state) {
  return {
    messages: state.messages,
    channels: state.channels,
    currentChannel: state.currentChannel
  };
};

export default connect(mapStateToProps)(ChannelList);
