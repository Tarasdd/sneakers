import React from 'react'
import AppContext from '../context';

const Info = ({title, image, description}) => {
  const {setOpenOverlay} = React.useContext(AppContext);

  return (
    <div className="cart-empty">
        <img width={120} src={image} alt="basket"/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setOpenOverlay(false)} className="greenButton">
          Come back
        </button>
    </div>
  )
}

export default Info;