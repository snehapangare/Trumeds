import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveBeautyCart,
  IncreaseBeautyQty,
  DecreaseBeautyQty
} from "../Redux/Slice/BeautySlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart = [] } = useSelector((state) => state.Beauty);
  const { isAuthinticated } = useSelector((state) => state.Auth);

  const totalMRP = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = totalMRP * 0.2;
  const finalPrice = totalMRP - discount;

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePayment = () => {
    alert("Proceeding to payment...");
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px" }}>

      {/* CART ITEMS */}
      <div style={{ flex: 2 }}>
        <h2>My Cart</h2>

        {cart.length === 0 ? (
          <h3>Your Cart is Empty</h3>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", marginRight: "20px" }}
              />

              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>{item.subcategory}</p>

                <h3>₹{item.price}</h3>

                {/* QUANTITY */}
                <div>
                  <button onClick={() => dispatch(DecreaseBeautyQty(item.id))}>
                    -
                  </button>

                  <span style={{ margin: "0 10px" }}>{item.qty}</span>

                  <button onClick={() => dispatch(IncreaseBeautyQty(item.id))}>
                    +
                  </button>
                </div>

                <br />

                <button onClick={() => dispatch(RemoveBeautyCart(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAYMENT SECTION */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          height: "fit-content"
        }}
      >
        <h3>Payment Details</h3>

        <p>MRP Total: ₹{totalMRP.toFixed(2)}</p>
        <p>Discount: -₹{discount.toFixed(2)}</p>
        <p>Delivery: FREE</p>

        <hr />

        <h2>Total: ₹{finalPrice.toFixed(2)}</h2>

        <button onClick={isAuthinticated ? handlePayment : handleLogin}>
          {isAuthinticated ? "Pay Now" : "Login"}
        </button>
      </div>

    </div>
  );
};

export default Cart;