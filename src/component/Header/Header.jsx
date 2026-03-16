import React from "react";
import { Container, Row, Col, Input, Navbar, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/netmeds_beta_logo.svg";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import "./Header.css";
import NavbarCompo from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/Slice/AuthSclice";
import { useNavigate } from "react-router-dom";

function Header() {
    const dispatch = useDispatch()
  const navigate = useNavigate()
   const{cart}=useSelector((state)=>state.Beauty)
     const { isAuthinticated } = useSelector((state) => state.Auth)
      const handleLogout = () => {
         dispatch(logOut())
         localStorage.clear()
         navigate('/')
       }
  return (
    <>
    <div className="header-bg">
      <Container fluid className="p-0">
        <Row className="m-0 align-items-center justify-content-between header-row">

          
          <Col md="4" className="d-flex align-items-center gap-3">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-img" />
            </Link>

            <div className="location-box">
              <FaLocationDot />
              <span>Deliver to Delhi, 110001</span>
            </div>
          </Col>

          
          <Col md="5" className="d-flex justify-content-center">
            <div className="search-box d-flex align-items-center w-100">
              <IoIosSearch className="search-icon" />
              <Input
                type="text"
                placeholder="Search for medicines, lab tests, doctors & beauty"
                className="search-input"
              />
            </div>
          </Col>

          
          <Col md="3" className="d-flex align-items-center justify-content-end gap-4">

            <Link to="/cart" className="icon-box position-relative">
              <PiShoppingCartSimpleFill />
              <span className="cart-badge">{cart.length}</span>
            </Link>
            { isAuthinticated ?
            <NavLink onClick={handleLogout} className="user-box">
              <FaUser />
              <span>LogOut</span>
            </NavLink>
            :

            <Link to="/login" className="user-box">
              <FaUser />
              <span>Sign In</span>
            </Link>
}

          </Col>

        </Row>
      </Container>
      
    </div>
    <div>
        <NavbarCompo/>
        </div>
        </>
  );
}

export default Header;
