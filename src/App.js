import './App.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./components/Login.css";
import axios from 'axios';
import Home from "./components/Home.js"

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [userverified, setUserVerified] = useState(false);

  const access = localStorage.getItem('access');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    axios.post(`http://127.0.0.1:8000/api/registerusers/`, {
      "username" : username,
      "password" : password
    })
      .then(res => {
        const response = res.data;
        if(response.status === 200){
            localStorage.setItem('access', true);
            window.location.reload();
        }
        else{
          alert(response.message);
        }
      })
  
    
  }
  return (
    <div className="Login">
      {
  
      !access ? 
      <Form  onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <div className="text-center">
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        </div>
      </Form> : <Home/>
}
    </div>
  );
}

export default App;
