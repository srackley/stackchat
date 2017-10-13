import React, { Component } from 'react';
<<<<<<< HEAD
import store, { updateName } from '../store';

export default class NameEntry extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (evt) {
    store.dispatch(updateName(evt.target.value));
  }

  render () {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.name}
        />
      </form>
    );
=======
import store, { writeName } from '../store';

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
    const nameVal = evt.target.value;
    const action = writeName(nameVal);
    store.dispatch(action);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const name = this.state.name;
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Your name: </label>
        <input
          type="text"
          name={name}
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>
    )
>>>>>>> 5495b1f2a9de9fb7bf9facf94a62b397942de557
  }
}
