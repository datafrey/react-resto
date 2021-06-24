import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';

const AppHeader = ({ items }) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });

  return (
    <header className="header">
      <Link to="/" className="header__link" href="#">
        Menu
      </Link>
      <Link to="/cart/" className="header__link" href="#">
        <img className="header__cart" src={cartIcon} alt="cart"></img>
        Total: {total} $
      </Link>
    </header>
  );
};

const mapStateToProps = ({ cartReducer: { items } }) => {
  return { items };
};

export default connect(mapStateToProps)(AppHeader);
