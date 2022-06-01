import React from 'react'
import Pokemon from './Pokemon'
import {Container, Row, Col} from 'react-bootstrap/';

function PokemonList({pokemons, handleEdit}) {
    const pokes = pokemons.map( pokemon => {
        return (
        <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            handleEdit={handleEdit}
        />
        )
    })
  return (
    <Container>
        <Row className="g-5">
           {pokes}
        </Row>
    </Container>
  )
}

export default PokemonList