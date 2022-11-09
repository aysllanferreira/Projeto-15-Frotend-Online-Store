import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './components/Category';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
      </Switch>
      <Category />
    </div>
  );
}

export default App;
