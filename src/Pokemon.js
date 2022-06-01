import React from 'react'
import {Container, Row,Col} from 'react-bootstrap/';
import { Link } from 'react-router-dom'

function Pokemon({pokemon, deletedPoke}) {
    const {name, hp, height, description, image, type, id} = pokemon
  
    function handleDelete(){
        deletedPoke(id)
        fetch(`http://localhost:9292/pokemons/${id}`, 
            { method: 'DELETE' })
        fetch(`http://localhost:9292//pokemon_moves/${id}`, 
            { method: 'DELETE' })
    }
   return (
    <Col>
        <img src ={image}/>
        <p>{name}</p>
        {/* <p>{type.element}</p> */}
        <p>{hp}</p>
        <p>{height}</p>
        <p>{description}</p>
        
        <Link to={`/pokemons/${id}/add_moves`}>
            <button 
            // onClick={() => handleEdit(id)}
            >Learn Moves</button>
        </Link>
        <Link to={`/pokemons/${id}/edit`}>
            <button 
            // onClick={() => handleEdit(id)}
            >Description</button>
        </Link>

        <button onClick={handleDelete}>Delete</button>
    </Col>
  )
}

export default Pokemon