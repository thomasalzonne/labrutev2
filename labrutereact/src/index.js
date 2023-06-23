import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import Router from './Router';
import Layout from './layout/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
  </BrowserRouter>
);
