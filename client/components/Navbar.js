import React from 'react';
import { connect } from 'react-redux';
import NameEntry from './NameEntry';

function Navbar (props) {

  const { channelName } = props;

  return (
    <nav>
      <h3># { channelName }</h3>
      <NameEntry />
    </nav>
  );
}

const mapStateToProps = function (state, ownProps) {

  const channel = state.channels.filter(channel => {
    return channel.id === Number(ownProps.channelId);
  })[0];

  return {
    channelName: channel ? channel.name : ''
  };
};

export default connect(mapStateToProps)(Navbar);
