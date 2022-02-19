import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 2){
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }

    return isReq;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if(isReq) {
    /* Send request to the server for authentication */
    axios.post('https://movies-api23.herokuapp.com/login', {
        Username: username,
        Password: password
    })
    .then(response =>{
        const data = response.data;
        props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('Login error');
      alert('Incorrect login credentials')
    });
  }
};

  return (
    <><Form>
      <Form.Group controlId="formUsername">
        <Form.Label id='form-title'>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
</Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label id='form-title'>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
</Form.Group>
      <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
    </Form></>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};