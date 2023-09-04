function Drawer({onClose, onRemove, items = []}) {
  return (
    <div className="overlay">
      <div className="drawer">
            <h2>Basket <img onClick={onClose} className="remove-btn" src="/img/btn-remove-hover.svg" alt="remove"/></h2>

            {
              items.length > 0 ? (
                <div>
                  <div className="items">
              {items.map(obj => (
              <div>
                <div key={obj.id} className="cart-item">
                  <img className="block-sneakers" width={80} height={70} src={`${obj.imgUrl}`} alt="img"/>

                  <div className="cart-description">
                    <p>{obj.title}</p>
                    <b>{obj.price} $</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className="remove-btn" src="/img/btn-remove-hover.svg" alt="remove"/>
                </div>
              </div>
              )
              )}
            </div> 
            <div className="cartTotalBlock">
            <ul>
                <li className="line">
                  <span>Total:</span>
                  <div></div>
                  <b>680 $</b>
                </li>
                <li  className="line">
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>34 $</b>
                </li>
              </ul>
            <button className="greenButton">checkout <img src="/img/arrow.svg" alt="Arrow"/></button>
         </div>
                </div>
            )
            : 
            (
            <div className="cart-empty">
              <img width={120} height={120} src="/img/basket.png" alt="basket"/>
              <h2>Empty basket</h2>
              <p>add sneakers to order</p>
              <button onClick={onClose} className="greenButton">
                Come back
              </button>
            </div>
            )
            }
            

            

            
            
            
        
      </div>
    </div>
  )
}

export default Drawer;