import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap/';
import {NavLink} from 'react-router-dom'

let links = {
  padding: 10,
  textDecoration: "none",
  color: "white",
  fontWeight: 600
}

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand to="/">PokemonList</Navbar.Brand>
    <Nav className="me-auto">
      <NavLink to="/" style={links}>Home</NavLink>
      <NavLink to="/pokemons" style={links}>Pokemons</NavLink>
      <NavLink to="/new" style={links}>Add New Pokemon</NavLink>
      <NavLink to="/new_moves" style={links}>Add New Move</NavLink>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default Header