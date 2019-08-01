import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    messageInput: ' ',
    nameInput: ' ',
    error: ' ',
    messageOutput: []
  };

  async componentWillMount() {
    this.getDataOfMessage();
  }

  getDataOfMessage = async () => {
    try {
      const messageOutput = await axios.get('api/message');

      this.setState({
        messageOutput: messageOutput.data
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  handleNameInput = e => {
    this.setState({
      nameInput: e.target.value
    });
  };

  handleMessageInput = e => {
    this.setState({
      messageInput: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { messageInput, nameInput } = this.state;

    if (messageInput === '' || nameInput === '') {
      this.setState({
        error: 'You forgot to write your name or message'
      });
    } else {
      const body = {
        messageInput,
        nameInput
      };
      try {
        await axios.post('api/message', body);
        this.getDataOfMessage();
      } catch (error) {
        this.setState({
          error
        });
      }
      this.setState({
        messageInput: '',
        nameInput: '',
        error: ''
      });
    }
  };

  render() {
    const { messageInput, nameInput, error } = this.state;

    return (
      <div className='container'>
        <div className=' jumbotron'>
          <h1 className='display-4'>Send Message</h1>
          <div>
            <input
              className='form-control'
              placeholder='Name'
              value={nameInput}
              type='text'
              onChange={this.handleNameInput}
            />
          </div>
          <br />
          <div>
            <textarea
              aria-label='note for the symptoms'
              className='form-control'
              placeholder='Your Message Here'
              type='text'
              value={messageInput}
              onChange={this.handleMessageInput}
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
        <div>
          {this.state.messageOutput.map(message => (
            <ul key={message.id}>
              {message.nameInput}:{message.messageInput}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
