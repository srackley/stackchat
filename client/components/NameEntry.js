import React, { Component } from 'react';
import store, { writeAuthor } from '../store';

export default class NameEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    const action = writeAuthor(evt.target.value);
    store.dispatch(action);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const name = this.state.author;
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name={name}
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
