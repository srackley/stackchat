import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ChannelList (props) {

  const { messages, channels } = props;

  return (
    <ul>
      {
        channels.map(channel => {
          return (
            <li key={channel.id}>
              <Link to={`/channels/${channel.id}`}>
                <span># {channel.name}</span>
                <span className="badge">{ messages.filter(message => message.channelId === channel.id).length }</span>
              </Link>
            </li>
          )
        })
      }
      <li>
        <Link to="/new-channel">Create a channel...</Link>
      </li>
    </ul>
  );
}

const mapStateToProps = function (state) {
  return {
      messages: state.messages,
      channels: state.channels
  };
};

export default connect(mapStateToProps)(ChannelList);
