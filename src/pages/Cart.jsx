import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CartLogo } from '../assets/img/cart.svg';
import { ReactComponent as TrashLogo } from '../assets/img/trash.svg';
import { ReactComponent as ArrowLogo } from '../assets/img/grey-arrow-left.svg';

import { CartItem } from '../components/CartItem';
import { CartEmpty } from '../components/CartEmpty';

import { clearItems, selectCart } from '../redux/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);

  const quantity = items.reduce((sum, item) => (sum += item.count), 0);

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (items.length <= 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartLogo />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashLogo />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{quantity} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <ArrowLogo />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
