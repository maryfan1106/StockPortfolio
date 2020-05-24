import React, { useContext, useState } from 'react';
import { RootContext } from './rootContextProvider';
import { Redirect } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = props => {
    const context = useContext(RootContext);
    console.log(context);

    const handleSubmit = (e) => {
        e.preventDefault();
        // clear previous error
        if (error.isOpen) setError({isOpen:false, message: ""});
        console.log(`Logging in with: ${email}, ${password}`);
        context.setAuthenticated();
        // redirect to homescreen or display error after post request
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({isOpen:false, message:""});

    // redirect to portfolio page if already logged in
    if (context.authenticated) {return < Redirect to='/' />};
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