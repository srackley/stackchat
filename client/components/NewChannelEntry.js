import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeChannelName, postChannel } from '../store';

function NewChannelEntry (props) {

  const { newChannelEntry, handleSubmit, handleChange } = props;

  return (
    <form onSubmit={evt => handleSubmit(newChannelEntry, evt)}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          value={newChannelEntry}
          onChange={handleChange}
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter channel name"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleChange (evt) {
      dispatch(writeChannelName(evt.target.value));
    },
    handleSubmit (name, evt) {
      evt.preventDefault();
      dispatch(postChannel({ name }));
      dispatch(writeChannelName(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelEntry);
