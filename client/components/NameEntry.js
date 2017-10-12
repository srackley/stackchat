import React, { Component } from 'react';
import store, { authorName } from '../Store';




export default class NameEntry extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(event){
    const action = authorName(event.target.value)
    // console.log('event', event.target.value)
    store.dispatch(action);
  }


  render() {
    return (
      <form className="form-inline">
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="form-control"
        onChange={this.handleChange}
      />
    </form>
    )
  }
}
