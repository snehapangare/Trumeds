import React, { useState } from "react";
import { FaThList } from "react-icons/fa";
import { FaCapsules, FaFlask, FaSpa, FaTags } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavbarCompo = () => {

  const [activeBeauty, setActiveBeauty] = useState("makeup");

  const { Beauty = [] } = useSelector((state) => state.Beauty || {});

  const navigate = useNavigate();

  /* ---------------- BEAUTY DATA ---------------- */

  const makeup = Beauty?.find((item) => item?.section === "Makeup");
  const momBaby = Beauty?.find((item) => item?.section === "Mom & Baby");
  const personalCare = Beauty?.find((item) => item?.section === "Personal Care");

  const uniqueMakeup = makeup?.subcategories?.map((ele) => ele?.name) || [];
  const uniqueMomBaby = momBaby?.subcategories?.map((ele) => ele?.name) || [];
  const uniquePersonal = personalCare?.subcategories?.map((ele) => ele?.name) || [];

  /* ---------------- NAVIGATION ---------------- */

  const handleBeauty = (val) => {
    navigate(`/beauty/subcategory/${val}`);
  };

  return (
    <div className="nav-container">

      <div className="nav-items">

        <div className="nav-item">
          <FaThList /> All Categories
        </div>

        {/* ---------------- MEDICINE (NAME ONLY) ---------------- */}

        <div className="nav-item">
          <FaCapsules /> Medicine
        </div>

        <div className="nav-item">
          <FaFlask /> Lab Tests
        </div>

        {/* ---------------- BEAUTY ---------------- */}

        <div className="nav-item medicine-item">
          <FaSpa /> Beauty

          <div className="mega-menu">

            <div className="menu-left">

              <p
                onMouseEnter={() => setActiveBeauty("makeup")}
                className={activeBeauty === "makeup" ? "active" : ""}
              >
                Makeup
              </p>

              <p
                onMouseEnter={() => setActiveBeauty("mom-baby")}
                className={activeBeauty === "mom-baby" ? "active" : ""}
              >
                Mom & Baby
              </p>

              <p
                onMouseEnter={() => setActiveBeauty("personal-care")}
                className={activeBeauty === "personal-care" ? "active" : ""}
              >
                Personal Care
              </p>

            </div>

            <div className="menu-right">

              {activeBeauty === "makeup" && (
                <div className="submenu-grid">
                  {uniqueMakeup.map((ele) => (
                    <p key={ele} onClick={() => handleBeauty(ele)}>
                      {ele}
                    </p>
                  ))}
                </div>
              )}

              {activeBeauty === "mom-baby" && (
                <div className="submenu-grid">
                  {uniqueMomBaby.map((ele) => (
                    <p key={ele} onClick={() => handleBeauty(ele)}>
                      {ele}
                    </p>
                  ))}
                </div>
              )}

              {activeBeauty === "personal-care" && (
                <div className="submenu-grid">
                  {uniquePersonal.map((ele) => (
                    <p key={ele} onClick={() => handleBeauty(ele)}>
                      {ele}
                    </p>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>

        <div className="nav-item">
          <FaHeartbeat /> Wellness
        </div>

        <div className="nav-item">
          <GiMedicines /> Health Corner
        </div>

        <div className="nav-item">
          <FaTags /> Offers
        </div>

      </div>
    </div>
  );
};

export default NavbarCompo;