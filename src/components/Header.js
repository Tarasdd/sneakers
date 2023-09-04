import {Link} from 'react-router-dom'

function Header(props) {
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
          <li onClick={props.onClickCart} className="comp-li">
            <img src="/img/Group.svg" alt="group"/>
            <p>1230 $</p>
          </li>
          <li className="comp-li">
            <Link to="/favorites">
              <img src="/img/zmdi_favorite-outline.svg" alt="fav"/>
            </Link>
          </li>
          <li className="comp-li">
            <img src="/img/Union.svg" alt="union"/>
          </li>
        </ul>
      </header>
  );
}

export default Header;