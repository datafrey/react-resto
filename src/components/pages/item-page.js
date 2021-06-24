import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import WithRestoService from '../hoc';
import {
  itemLoaded,
  itemRequested,
  itemLoadingErrorOccured,
  clearItemData
} from '../../redux/ducks/itemReducer';
import { addToCart } from '../../redux/ducks/cartReducer';
import Spinner from '../spinner';
import Error from '../error';

import './item-page.scss';

class ItemPage extends Component {
  componentDidMount() {
    const { itemRequested, RestoService } = this.props;
    const itemId = +this.props.match.params.id;

    itemRequested();
    RestoService.getMenuItem(itemId).on('value', this.updateItem);
  }

  componentWillUnmount() {
    const { clearItemData, RestoService } = this.props;
    const itemId = +this.props.match.params.id;

    RestoService.getMenuItem(itemId).off('value', this.updateItem);
    clearItemData();
  }

  updateItem = (snapshot) => {
    const { itemLoaded, itemLoadingErrorOccured } = this.props;

    if (snapshot.exists()) {
      itemLoaded(snapshot.val());
    } else {
      itemLoadingErrorOccured({
        message: 'An error occured while retrieving item data...'
      });
    }
  };

  render() {
    const { item, itemLoading, itemLoadingError } = this.props;
    let itemElement = null;

    if (item) {
      const { addToCart } = this.props;
      const { title, price, url, category, description } = item;

      itemElement = (
        <div className="menu-item">
          <div className="menu-item__title">{title}</div>
          <img className="menu-item__img" src={url} alt={title}></img>
          <div className="menu-item__category">
            Category: <span>{category}</span>
          </div>
          <div className="menu-item__price">
            Price: <span>{price}$</span>
          </div>
          <div className="menu-item__descr">{description}</div>
          <button className="menu-item__btn" onClick={() => addToCart(item)}>
            Add to cart
          </button>
        </div>
      );
    }

    return (
      <>
        {itemLoading ? <Spinner /> : null}
        {itemLoadingError ? <Error message={itemLoadingError.message} /> : null}

        <CSSTransition
          in={itemLoading}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Spinner />
        </CSSTransition>

        <CSSTransition
          in={Boolean(itemLoadingError)}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Error message={itemLoadingError ? itemLoadingError.message : ''} />
        </CSSTransition>

        {itemElement}
      </>
    );
  }
}

const mapStateToProps = ({ itemReducer }) => {
  const { item, itemLoading, itemLoadingError } = itemReducer;
  return { item, itemLoading, itemLoadingError };
};

const mapDispatchToProps = {
  itemLoaded,
  itemRequested,
  itemLoadingErrorOccured,
  clearItemData,
  addToCart
};

export default WithRestoService()(
  connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
