import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import WithRestoService from '../hoc';
import {
  menuLoaded,
  menuRequested,
  menuLoadingErrorOccured
} from '../../redux/ducks/menuReducer';
import { addToCart } from '../../redux/ducks/cartReducer';
import MenuListItem from '../menu-list-item';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {
  componentDidMount() {
    const { menuRequested, RestoService } = this.props;

    menuRequested();
    RestoService.getMenuItems().on('value', this.updateMenu);
  }

  componentWillUnmount() {
    const { RestoService } = this.props;
    RestoService.getMenuItems().off('value', this.updateMenu);
  }

  updateMenu = (snapshot) => {
    const { menuLoaded, menuLoadingErrorOccured } = this.props;

    if (snapshot.exists()) {
      const items = snapshot.val();

      let i = 0;
      snapshot.forEach((childsnap) => {
        items[i]['id'] = childsnap.key;
        i++;
      });

      menuLoaded(items);
    } else {
      menuLoadingErrorOccured({
        message: "Can't load menu, please check your internet connection..."
      });
    }
  };

  render() {
    const { menu, menuLoading, menuLoadingError, addToCart } = this.props;

    const elements = menu.map((item) => (
      <MenuListItem
        key={item.id}
        menuItem={item}
        onAddToCart={() => addToCart(item)}
      />
    ));

    return (
      <>
        <CSSTransition
          in={menuLoading}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Spinner />
        </CSSTransition>

        <CSSTransition
          in={Boolean(menuLoadingError)}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Error message={menuLoadingError ? menuLoadingError.message : ''} />
        </CSSTransition>

        <ul className="menu__list">{elements}</ul>
      </>
    );
  }
}

const mapStateToProps = ({ menuReducer }) => {
  const { menu, menuLoading, menuLoadingError } = menuReducer;
  return { menu, menuLoading, menuLoadingError };
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  menuLoadingErrorOccured,
  addToCart
};

export default WithRestoService()(
  connect(mapStateToProps, mapDispatchToProps)(MenuList)
);
