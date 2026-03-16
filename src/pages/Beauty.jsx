import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  AddBeautyCart,
  RemoveBeautyCart
} from "../Redux/Slice/BeautySlice";

import { GetBeauty } from "../Redux/Slice/Action";

const Beauty = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Beauty = [], cart = [] } = useSelector((state) => state.Beauty);
  const { isAuthinticated } = useSelector((state) => state.Auth);

  const { value } = useParams();

  const [price, setPrice] = useState(2000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  /* ---------------- FETCH BEAUTY ---------------- */

  useEffect(() => {
    dispatch(GetBeauty());
  }, [dispatch]);

  /* ---------------- FLATTEN JSON ---------------- */

  const allProducts = Beauty.flatMap((section) =>
    section.subcategories.flatMap((sub) =>
      sub.products.map((product) => ({
        ...product,
        category: section.section,
        subcategory: sub.name
      }))
    )
  );

  /* ---------------- BASE FILTER ---------------- */

  const baseFilteredData = allProducts.filter(
    (item) => item.subcategory === value
  );

  /* ---------------- CATEGORY LIST ---------------- */

  const categories = [...new Set(allProducts.map((item) => item.category))];

  /* ---------------- SUBCATEGORY LIST ---------------- */

  const subcategories = [
    ...new Set(baseFilteredData.map((item) => item.subcategory))
  ];

  /* ---------------- CATEGORY CHANGE ---------------- */

  const handleCategoryChange = (cat) => {
    if (selectedCategory.includes(cat)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== cat));
    } else {
      setSelectedCategory([...selectedCategory, cat]);
    }
  };

  /* ---------------- SUBCATEGORY CHANGE ---------------- */

  const handleSubCategoryChange = (sub) => {
    if (selectedSubCategory.includes(sub)) {
      setSelectedSubCategory(selectedSubCategory.filter((c) => c !== sub));
    } else {
      setSelectedSubCategory([...selectedSubCategory, sub]);
    }
  };

  /* ---------------- ADD CART ---------------- */

  const handleAdd = (item) => {

    if (!isAuthinticated) {
      navigate("/login");
      return;
    }

    dispatch(AddBeautyCart(item));
  };

  /* ---------------- REMOVE CART ---------------- */

  const handleRemove = (id) => {
    dispatch(RemoveBeautyCart(id));
  };

  /* ---------------- FINAL FILTER ---------------- */

  const filteredData = baseFilteredData.filter((item) => {

    if (
      selectedCategory.length > 0 &&
      !selectedCategory.includes(item.category)
    ) return false;

    if (
      selectedSubCategory.length > 0 &&
      !selectedSubCategory.includes(item.subcategory)
    ) return false;

    if (item.price > price) return false;

    return true;
  });

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "25%",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px"
        }}
      >
        <h3>Filters</h3>

        {/* CATEGORY */}
        <div>
          <h4>Category</h4>

          {categories.map((cat) => (
            <div key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategory.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* SUBCATEGORY */}
        <div style={{ marginTop: "20px" }}>
          <h4>Sub Category</h4>

          {subcategories.map((sub) => (
            <div key={sub}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSubCategory.includes(sub)}
                  onChange={() => handleSubCategoryChange(sub)}
                />
                {sub}
              </label>
            </div>
          ))}
        </div>

        {/* PRICE */}
        <div style={{ marginTop: "20px" }}>
          <h4>Price: ₹0 - ₹{price}</h4>

          <input
            type="range"
            min="0"
            max="2000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        {/* CLEAR */}
        <button
          onClick={() => {
            setSelectedCategory([]);
            setSelectedSubCategory([]);
            setPrice(2000);
          }}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* PRODUCTS */}
      <div style={{ width: "75%" }}>
        <h2>
          Showing results for{" "}
          <span style={{ color: "#24aeb1" }}>{value}</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          {filteredData.length > 0 ? (
            filteredData.map((item) => {

              const isInCart = cart.some((c) => c.id === item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain"
                    }}
                  />

                  <h4>{item.name}</h4>
                  <p>{item.subcategory}</p>
                  <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

                  {isInCart ? (
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px"
                      }}
                    >
                      Remove Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdd(item)}
                      style={{
                        background: "#24aeb1",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px"
                      }}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No Data Found</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Beauty;