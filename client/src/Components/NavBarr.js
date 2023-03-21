import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import Button  from 'react-bootstrap/Button';
import { LogOut } from '../Redux/AuthSlice';
import { useDispatch } from 'react-redux';

const NavBarr = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = localStorage.getItem('isAuth')
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>

          {isAuth ? <>
            <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/posts">Posts</Nav.Link>


            <Button onClick={(e)=>{e.preventDefault()
                                  dispatch(LogOut())
                                  navigate('/Login')                    
            
            }} variant='light'>LogOut</Button>
          </>
 :
          <>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            <Nav.Link as={Link} to="/">Register</Nav.Link>
          </Nav>
          </>}
          
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBarr