import React from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store';

function NewMessageEntry (props) {

  const { name, messageContent, handleChange, handleSubmit } = props;

  return (
    <form id="new-message-form" onSubmit={evt => handleSubmit(name, messageContent, evt)}>
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={messageContent}
          onChange={handleChange}
          placeholder="Say something nice..."
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Chat!</button>
        </span>
      </div>
    </form>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    messageContent: state.messageContent,
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeMessage(evt.target.value))
    },
    handleSubmit (name, content, evt) {
      evt.preventDefault();

      const { channelId } = ownProps;

      dispatch(postMessage({ name, content, channelId }));
      dispatch(writeMessage(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
