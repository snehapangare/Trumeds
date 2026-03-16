// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Collapse,Nav, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { logOut } from '../Redux/Slice/AuthSclice'
// const Header = () => {
//     const { isAuthinticated } = useSelector((state) => state.Auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [isOpen,setIsOpen]=useState(false)

//   const handleLogout = () => {
//     dispatch(logOut())
//     localStorage.clear()
//     navigate('/login')
//   }
//   return (
//     <Navbar color='light' light expand="md" className='mb-4'>
//         <Container>
//             <NavbarBrand tag={Link} to="/">MyApp</NavbarBrand>
//             <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
//             <Collapse isOpen={isOpen} navbar>
//               <Nav className ="me-auto" navbar>
//                 {isAuthinticated ? (
//               <>
//                <NavItem>
//               <NavLink tag={Link} to="/">
//                 Home
//               </NavLink>
//             </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} to="/user">
//                     User
//                   </NavLink>
//                 </NavItem>

//                 <NavItem>
//                   <NavLink tag={Link} to="/profile">
//                     Profile
//                   </NavLink>
//                 </NavItem>

//                 <NavItem>
//                   <NavLink  style={{ cursor: "pointer" }} onClick={handleLogout}>
//                   Logout
//                   </NavLink>
//                 </NavItem>
//               </>
//             ) : (
//               <NavItem>
//                 <NavLink tag={Link} to="/">
//                   home
//                 </NavLink>
//                 <NavLink tag={Link} to="/login">
//                   Login
//                 </NavLink>
//               </NavItem>
//             )}
                
//               </Nav>
             
//             </Collapse>
//         </Container>
//     </Navbar>
//   )
// }

// export default Header