import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from './Search';
import logoSvg from '../assets/img/pizza-logo.svg';
import { ReactComponent as CartLogo } from '../assets/img/cart.svg';

import { selectCart } from '../redux/slices/cartSlice';

function Header() {
  const { items, totalPrice } = useSelector(selectCart);
  const { pathname } = useLocation();

  const quantity = items.reduce((sum, item) => (sum += item.count), 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {pathname !== '/cart' && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <CartLogo />
              <span>{quantity}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
