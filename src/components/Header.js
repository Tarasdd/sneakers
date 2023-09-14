import React from 'react';
import {Link} from 'react-router-dom'
import AppContext from '../context';

function Header({ onClickCart }) {
  const { cartItem } = React.useContext(AppContext)

  const totalAmount = () => {
    return cartItem.reduce((sum, obj) => obj.price + sum, 0)
  }

  return (
    <header>
        <Link to="/">
          <div className="header__left">
            <img className="logo" width={40} heigth={40} src="/img/logo.png" alt="logo"/>
            <div className="header__info">
              <h3 className="name">React Sneakers</h3>
              <p>Shop the best sneakers</p>
            </div>
          </div>
        </Link>
        <ul className="header__right">
          <li onClick={onClickCart} className="comp-li">
            <img  className='icons' src="/img/Group.svg" alt="group"/>
            <p>{totalAmount()} $</p>
          </li>
          <li className="comp-li">
            <Link to="/favorites">
              <img className='icons' src="/img/zmdi_favorite-outline.svg" alt="fav"/>
            </Link>
          </li>
          <li className="comp-li">
            <Link to="/orders">
              <img className='icons' src="/img/Union.svg" alt="union"/>
            </Link>
          </li>
        </ul>
      </header>
  );
}

export default Header;