import React, { useEffect, useState } from "react";
import "./CSS/OrderHistory.css";
import axios from "axios";

const OrderHistory = () => {

  const [orders, setOrders] = useState([]);

  const fetchAPI = async () => {
    const orders = await axios.get("http://localhost:4000/orders");
    setOrders(orders.data.result);
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return orders && orders.length > 0 ? (
    orders.map((order) => {
      return (<div className="card">
        <div class="text-center">
          <table className="center-table">
            <tr>
            <td>Name</td>
            <td>Product</td>
            <td>Amount</td>
            <td>Address</td>
            </tr>
            <tr>
          <td>{order.customerName}</td>
          <td>{order.product.name}</td>
          <td>{order.product.new_price}</td>
          <td>{order.address}</td>
          </tr>
          </table>
        </div>
      </div>)
    })

  ) : <></>;
};

export default OrderHistory;
