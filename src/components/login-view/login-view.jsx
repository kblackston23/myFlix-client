import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://movies-api23.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <>
    <div>
      <h1>Welcome to myFlix!</h1>
        <p>Please log in to continue.</p>
    </div>
    <Form>
    <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>
      Log In
    </Button>
  </Form>
    <div><br />
      <span>Need to create an account?</span><br />
      <button type="submit">Register Here</button>
    </div></>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};