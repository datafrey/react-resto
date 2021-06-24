import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import WithRestoService from '../hoc';
import {
  deleteFromCart,
  orderSendingStarted,
  orderSent,
  uiReactedToOrderSendSuccess,
  orderSendErrorOccured,
  uiReactedToOrderSendError
} from '../../redux/ducks/cartReducer';
import Spinner from '../spinner';
import Error from '../error';
import Success from '../success';

import './cart-table.scss';

class CartTable extends Component {
  componentWillUnmount() {
    const {
      orderSendSuccess,
      orderSendError,
      uiReactedToOrderSendSuccess,
      uiReactedToOrderSendError
    } = this.props;

    if (orderSendSuccess) {
      uiReactedToOrderSendSuccess();
    }

    if (orderSendError) {
      uiReactedToOrderSendError();
    }
  }

  getUniqueItemsWithCounts() {
    const { items } = this.props;

    const uniqueItems = [];
    items.forEach((item) => {
      if (uniqueItems.filter((el) => el.id === item.id).length === 0) {
        uniqueItems.push(item);
      }
    });

    for (let i = 0; i < uniqueItems.length; i++) {
      uniqueItems[i]['count'] = items.filter(
        (item) => item.id === uniqueItems[i].id
      ).length;
    }

    return uniqueItems;
  }

  sendOrder = () => {
    const {
      orderSendingStarted,
      orderSent,
      uiReactedToOrderSendSuccess,
      orderSendErrorOccured,
      uiReactedToOrderSendError,
      RestoService
    } = this.props;

    orderSendingStarted();

    const uniqueItems = this.getUniqueItemsWithCounts();
    const order = { total: 0 };

    for (const item of uniqueItems) {
      const { id, count, price } = item;
      order[id] = count;
      order.total += price * count;
    }

    RestoService.addNewOrder(order)
      .then(() => {
        orderSent();
        setTimeout(uiReactedToOrderSendSuccess, 3000);
      })
      .catch((error) => {
        orderSendErrorOccured(error);
        setTimeout(uiReactedToOrderSendError, 5000);
      });
  };

  render() {
    const {
      items,
      orderSending,
      orderSendSuccess,
      orderSendError,
      deleteFromCart
    } = this.props;

    const uniqueItems = this.getUniqueItemsWithCounts();

    const elements = uniqueItems.map((item) => {
      const { title, price, url, id, count } = item;
      return (
        <div key={id} className="cart__item">
          <img src={url} className="cart__item-img" alt={title}></img>
          <div className="cart__item-title">
            {title} ({price}$)
          </div>
          <div className="cart__item-count">x{count}</div>
          <div className="cart__item-price">{price * count}$</div>
          <div onClick={() => deleteFromCart(id)} className="cart__close">
            &times;
          </div>
        </div>
      );
    });

    return (
      <>
        <CSSTransition
          in={orderSendSuccess}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Success message="Your order has been sent!" />
        </CSSTransition>

        <CSSTransition
          in={orderSending}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Spinner />
        </CSSTransition>

        <CSSTransition
          in={Boolean(orderSendError)}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Error message={orderSendError ? orderSendError.message : ''} />
        </CSSTransition>

        {items.length === 0 ? (
          !orderSendSuccess ? (
            <div className="cart__empty-placeholder">Your cart is empty.</div>
          ) : null
        ) : (
          <>
            <div className="cart__title">Your order:</div>
            <div className="cart__list">{elements}</div>
            <button className="cart__btn" onClick={this.sendOrder}>
              Complete order
            </button>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => {
  const { items, orderSending, orderSendSuccess, orderSendError } = cartReducer;
  return { items, orderSending, orderSendSuccess, orderSendError };
};

const mapDispatchToProps = {
  deleteFromCart,
  orderSendingStarted,
  orderSent,
  uiReactedToOrderSendSuccess,
  orderSendErrorOccured,
  uiReactedToOrderSendError
};

export default WithRestoService()(
  connect(mapStateToProps, mapDispatchToProps)(CartTable)
);
