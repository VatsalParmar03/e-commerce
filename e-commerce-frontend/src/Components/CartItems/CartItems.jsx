import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import axios from 'axios';

const CartItems = () => {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [flatNo, setflatNo] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');


  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  const makeOrder = async () => {
    try {
      const product_ids = Object.entries(cartItems)
        .filter(([key, value]) => value >= 1)
        .map(([key, value]) => ({ key: key, value: value }));

      const response = await axios.post("https://e-commerce-voen.onrender.com/make-order", {
        product_ids: product_ids,
        address: flatNo + area + city + state + pincode + " - " + contact,
        fullName: fullName
      });

      if(response){
        alert("Order confirmed!");
      }
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {

        if (cartItems[e.id] > 0) {
          return <div>
            <div className="cartitems-format-main cartitems-format">
              <img className="cartitems-product-icon" src={e.image} alt="" />
              <p cartitems-product-title>{e.name}</p>
              <p>${e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>${e.new_price * cartItems[e.id]}</p>
              <img onClick={() => { removeFromCart(e.id) }} className="cartitems-remove-icon" src={cross_icon} alt="" />
            </div>
            <hr />
          </div>;
        }
        return null;
      })}
      <br></br>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <div>
              <br></br>
              <br></br>
              <br></br>
            <p>Your order will be delivered in 15 days.</p>
            </div>
            <hr />
            <br></br>
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
            <br></br>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={makeOrder}>ORDER NOW</button>

        </div>
        <div className="details">
          <p className="name">Name</p>
          <br></br>
          <input type="text" value={fullName} placeholder="Full Name" onChange={(event) => {
            setFullName(event.target.value)
          }} />
          <br></br>
          <br></br>
          <input type="number" value={contact} placeholder="Contact Number" onChange={(event) => {
            setContact(event.target.value)
          }} />
          <br></br>
          <br></br>
          <p className="name">Address</p>
          <br></br>
          <input type="text" value={flatNo} placeholder="Flat no./House no." onChange={(event) => {
            setflatNo(event.target.value)
          }} />
          <br></br>
          <br></br>
          <input type="text" value={area} placeholder="Area" onChange={(event) => {
            setArea(event.target.value)
          }} />
          <br></br>
          <br></br>
          <input type="text" value={city} placeholder="City" onChange={(event) => {
            setCity(event.target.value)
          }} />
          <br></br>
          <br></br>
          <input type="text" value={state} placeholder="State" onChange={(event) => {
            setState(event.target.value)
          }} />
          <br></br>
          <br></br>
          <input type="number" value={pincode} placeholder="Pin Code" onChange={(event) => {
            setPincode(event.target.value)
          }} />
          <br></br>
          <br></br>
          <br></br>

        </div>
      </div>
    </div>
  );
};

export default CartItems;
