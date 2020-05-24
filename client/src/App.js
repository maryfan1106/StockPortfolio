import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portfolio from './components/portfolio';
import Signup from './components/signup';
import Login from './components/login';
import Transactions from './components/transactions';
import NavBar from './components/navbar';
import { Container } from 'reactstrap';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Container>
          <Route exact path="/" component={Portfolio} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/transactions" component={Transactions} />
        </Container>
      </div>
    </Router>
  );
}

export default App;