import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    message: ' ',
    name: ' ',
    error: ' '
  };

  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { message, name } = this.state;

    if (message === '' || name === '') {
      this.setState({
        error: 'You forgot to write your name or message'
      });
    } else {
      const body = {
        message: message,
        name: name
      };
      try {
        await axios.post('http://localhost:4000/api/message', body);
      } catch (error) {
        this.setState({
          error
        });
      }
      this.setState({
        message: '',
        name: '',
        error: ''
      });
    }
  };

  render() {
    const { message, name, error } = this.state;
    console.log({ message, name, error });
    return (
      <div className='container'>
        <div className=' jumbotron'>
          <h1 className='display-4'>Send Message</h1>
          <div>
            <input
              className='form-control'
              placeholder='Name'
              value={name}
              type='text'
              onChange={this.handleName}
            />
          </div>
          <br />
          <div>
            <textarea
              aria-label='note for the symptoms'
              className='form-control'
              placeholder='Your Message Here'
              type='text'
              value={message}
              onChange={this.handleMessage}
            />
          </div>
          <br />
          <div>
            <button
              id='send'
              className='btn btn-success'
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
