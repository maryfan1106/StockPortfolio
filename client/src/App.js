import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portfolio from './components/portfolio';
import Signup from './components/signup';
import Login from './components/login';
import Transactions from './components/transactions';
import NavBar from './components/navbar';
import { Container } from 'reactstrap';
import { AuthenticatedRoute } from './auth/authRoute';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Container>
          <Switch>
            <AuthenticatedRoute exact path="/" component={Portfolio} />
            <AuthenticatedRoute exact path="/transactions" component={Transactions} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={()=>{ return <div style={{textAlign:'center'}}>Page not found</div>}} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;