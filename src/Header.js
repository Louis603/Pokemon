import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap/';
// import {NavLink} from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#">Pokemons</Nav.Link>
      <Nav.Link href="#">Add New</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default Header