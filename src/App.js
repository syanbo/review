import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Loadable from 'react-loadable';
import { Header } from './components';
import Home from './pages/home';
import Dash from './pages/dash';
import './App.css';

const AsyncDashboard = Loadable({
  loader: () => import('./pages/dashboard'),
  loading: err => {
    console.log(err);
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <nav>
          <Link to="/">Home</Link>
          <Link to="dashboard">Dashboard</Link>
          <Link to="dash">Dash</Link>
          <Link to="users/123">Bob</Link>
        </nav>
        <Router>
          <Home path="/" />
          <AsyncDashboard path="dashboard/*" />
          <Dash path="dash" />
        </Router>
      </div>
    );
  }
}

export default App;
