import React from 'react';
import { Link } from 'react-router-dom';

import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart }) => {
  const { title, price, url, category, id } = menuItem;

  let categoryIcon;
  switch (category) {
    case 'pizza':
      categoryIcon = (
        <img
          className="menu__category-icon"
          src="./icons/pizza_icon.svg"
          alt="pizza icon"
        ></img>
      );
      break;
    case 'salads':
      categoryIcon = (
        <img
          className="menu__category-icon"
          src="./icons/salad_icon.svg"
          alt="salad icon"
        ></img>
      );
      break;
    case 'meat':
      categoryIcon = (
        <img
          className="menu__category-icon"
          src="./icons/meat_icon.svg"
          alt="meat icon"
        ></img>
      );
      break;
    default:
      categoryIcon = null;
  }

  return (
    <li className="menu__item">
      <Link to={`/${id}`} href="#" className="menu__title">
        {title}
      </Link>
      <img className="menu__img" src={url} alt={title}></img>
      <div className="menu__category">
        Category: <span>{category}</span>
      </div>
      <div className="menu__price">
        Price: <span>{price}$</span>
      </div>
      <button onClick={() => onAddToCart()} className="menu__btn">
        Add to cart
      </button>
      {categoryIcon}
    </li>
  );
};

export default MenuListItem;
