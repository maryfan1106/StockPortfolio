import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = props => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // clear previous error
        if (error.isOpen) setError({isOpen:false, message: ""})
        alert(`Logging in with: ${email}, ${password}`)
        // redirect to homescreen or display error after post request
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({isOpen:false, message:""});

    return (
        <div>
            <h3>
                Login
            </h3>
            <Alert color="danger" isOpen={error.isOpen}>
                {error.message}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="emailField">Email</Label>
                    <Input 
                        required
                        type="email" 
                        name="email"
                        id="emailField" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordField">Password</Label>
                    <Input 
                        required
                        type="password" 
                        name="password" 
                        id="passwordField" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </FormGroup>
                <Button type="submit" value="Submit">Login</Button>
            </Form>
            <p>
                Don't have an account? 
                <a href="/signup"> Sign up</a> 
            </p>
        </div>
    );
  };
  
  export default Login;