import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/index';  // Adjust import path based on your structure
import Dashboard from './pages/Dashboard/index';  // Adjust import path based on your structure
import CityServices from './pages/CityServices';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/city-services" component={CityServices} />
      </Switch>
    </Router>
  );
};

export default App;
