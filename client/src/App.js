import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Portfolio from './components/portfolio';
import Signup from './components/signup';
import Login from './components/login';
import Transactions from './components/transactions';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Portfolio} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/transactions" component={Transactions} />
    </Router>
  );
}

export default App;