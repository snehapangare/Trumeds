import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddBeautyCart, RemoveBeautyCart } from "../Redux/Slice/BeautySlice";
import { GetBeauty } from "../Redux/Slice/Action";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Beauty = [], cart = [], loading, error } =
    useSelector((state) => state.Beauty);

  const { isAuthinticated } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(GetBeauty());
  }, [dispatch]);

  /* FLATTEN BEAUTY JSON */
  const allProducts = Beauty.flatMap((section) =>
    section.subcategories.flatMap((sub) =>
      sub.products.map((product) => ({
        ...product,
        category: section.section,
        subcategory: sub.name
      }))
    )
  );

  const Add = (item) => {

    if (!isAuthinticated) {
      navigate("/login");
      return;
    }

    dispatch(AddBeautyCart(item));
  };

  const remove = (id) => {
    dispatch(RemoveBeautyCart(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Beauty Products</h2>

      {allProducts.map((ele) => {

        const isInCart = cart.some((item) => item.id === ele.id);

        return (
          <div
            key={ele.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px",
              borderRadius: "10px"
            }}
          >

            <img
              src={ele.image}
              alt={ele.name}
              style={{ width: "120px" }}
            />

            <p>Name: {ele.name}</p>
            <p>Category: {ele.category}</p>
            <p>Subcategory: {ele.subcategory}</p>
            <p>Price: ₹{ele.price}</p>

            {isInCart ? (
              <button onClick={() => remove(ele.id)}>
                Remove Cart
              </button>
            ) : (
              <button onClick={() => Add(ele)}>
                Add To Cart
              </button>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default Home;