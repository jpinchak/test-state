import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import styles from './style.css';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloSetup';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
