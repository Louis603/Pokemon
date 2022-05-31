import React from 'react'
import {Container, Row,Col} from 'react-bootstrap/';

function Pokemon({pokemon}) {
    const {name, hp, height, description, image, type} = pokemon
    console.log(type.element)
  return (
    <Col>
        <img src ={image}/>
        <p>{name}</p>
        <p>{type.element}</p>
        <p>{hp}</p>
        <p>{height}</p>
        <p>{description}</p>
        
        <button>Add Moves</button>
        
    </Col>
  )
}

export default Pokemon