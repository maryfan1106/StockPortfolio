import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import { RootContextProvider } from './auth/rootContextProvider';

ReactDOM.render(
  <RootContextProvider>
    <App />
  </RootContextProvider>,
  document.getElementById('root')
);
