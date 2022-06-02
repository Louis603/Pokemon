import React from 'react'
import Pokemon from './Pokemon'
import {Container, Row, Col} from 'react-bootstrap/';
import {useState} from "react";

function PokemonList({pokemons, deletedPoke}) {
  // const [pokeArr, setPokeArr] = useState([])
  // setPokeArr(pokemons)

    const pokes = pokemons.map( pokemon => {
        return (
        <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            deletedPoke={deletedPoke}
            types={pokemon.type}
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