import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the grand total amount for all items in the shopping cart.
   * Strips the '$' sign from cost string and multiplies by item quantity.
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')) || 0;
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  /**
   * Handles navigation back to the product listing page.
   * @param {Event} e - Click event from the Continue Shopping button.
   */
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  /**
   * Triggers checkout notification alert.
   * @param {Event} e - Click event from the Checkout button.
   */
  const handleCheckoutShopping = (e) => {
    alert('Coming Soon');
  };

  /**
   * Dispatches Redux action to increase quantity of a specific item by 1.
   * @param {Object} item - Cart item to increment.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Dispatches Redux action to decrease item quantity, or removes item if quantity reaches 1.
   * @param {Object} item - Cart item to decrement.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Dispatches Redux action to completely remove an item from the cart.
   * @param {Object} item - Cart item to remove.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Calculates the subtotal cost for a single item type in the cart.
   * @param {Object} item - Cart item containing cost and quantity.
   */
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')) || 0;
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2 style={{ color: 'black', textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', borderBottom: '1px solid #ccc', padding: '15px 0', alignItems: 'center', justifyContent: 'space-between' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div className="cart-item-details">
              <div className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity" style={{ margin: '10px 0' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', marginRight: '5px' }}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', marginLeft: '5px' }}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', marginTop: '5px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
