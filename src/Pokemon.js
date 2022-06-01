import React from 'react'
import {Container, Row,Col} from 'react-bootstrap/';
import { Link } from 'react-router-dom'

function Pokemon({pokemon, handleEdit}) {
    const {name, hp, height, description, image, type, id} = pokemon
  
   return (
    <Col>
        <img src ={image}/>
        <p>{name}</p>
        {/* <p>{type.element}</p> */}
        <p>{hp}</p>
        <p>{height}</p>
        <p>{description}</p>
        
        <Link to={`/pokemons/${id}/edit`}>
            <button onClick={() => handleEdit(id)}>Add Moves</button>
        </Link>
    </Col>
  )
}

export default Pokemon