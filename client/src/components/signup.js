import React, { useContext, useState } from 'react';
import { RootContext } from '../auth/rootContextProvider';
import { Redirect } from 'react-router-dom';
import { Alert, Form, Label, Input } from 'reactstrap';
import { signUp } from '../actions/users';
import '../css/forms.css';

const Signup = props => {
    const context = useContext(RootContext);

    const setAuth = () => context.setAuthenticated();
    const setErrorMessage = err => setError({isOpen:true, message: err});

    const handleSubmit = (e) => {
        e.preventDefault();
        // clear previous error
        if (error.isOpen) setError({isOpen:false, message: ""});
        // signup with user, setAuth on success, setError on failure
        signUp(
            {email, password},
            setAuth,
            setErrorMessage
        );
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({isOpen:false, message:""});

    // redirect to portfolio page if already logged in
    if (context.authenticated) {return < Redirect to='/' />};
    return (
        <div class="input-form">
            <h3 style={{textAlign:"center"}}>
                Stock Portfolio
            </h3>
            <Alert color="danger" isOpen={error.isOpen}>
                {error.message}
            </Alert>
            <Form onSubmit={handleSubmit}>
                <div className="input-field">
                    <Label for="emailField">Email</Label>
                    <Input 
                        required
                        type="email" 
                        name="email"
                        id="emailField" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div class="input-field">
                    <Label for="passwordField">Password</Label>
                    <Input 
                        required
                        type="password" 
                        name="password" 
                        id="passwordField" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                <button class="submit-button" type="submit" value="Submit">Sign Up</button>
            </Form>
            <p style={{textAlign:"center"}}>
                Already have an account? 
                <a href="/login"> Login</a> 
            </p>
        </div>
    );
  };
  
  export default Signup;