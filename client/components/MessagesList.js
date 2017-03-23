import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';

function MessagesList (props) {

  const { channelId, messages } = props;

  return (
    <div>
      <ul className="media-list">
        { messages.map(message => <Message message={message} key={message.id} />) }
      </ul>
      <NewMessageEntry channelId={channelId} />
    </div>
  );
}

const mapStateToProps = function (state, ownProps) {

  const channelId = Number(ownProps.match.params.channelId);

  return {
    messages: state.messages.filter(message => message.channelId === channelId),
    channelId
  };
};

export default connect(mapStateToProps)(MessagesList);
