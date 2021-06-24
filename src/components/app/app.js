import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, CartPage, ItemPage } from '../pages';
import AppHeader from '../app-header';
import Error from '../error';

import Background from './food-bg.jpg';

const App = () => {
  return (
    <div
      style={{
        background: `url(${Background}) center center/cover no-repeat`,
        height: '100vh',
        overflowX: 'hidden',
        paddingTop: '60px'
      }}
      className="app"
    >
      <AppHeader total={50} />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/cart" exact component={CartPage} />
        <Route path="/:id" component={ItemPage} />
        <Route component={() => <Error message="!" />} />
      </Switch>
    </div>
  );
};

export default App;
