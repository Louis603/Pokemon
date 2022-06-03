import React from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap/';
import { Link } from 'react-router-dom'


function Pokemon({pokemon, deletedPoke, types}) {
    const {name, hp, height, description, image, id} = pokemon

    //this delete function deletes from Pokemon table and PokemonMoves table
    function handleDelete(){
        deletedPoke(id)
        fetch(`http://localhost:9292/pokemons/${id}`, 
            { method: 'DELETE' })
        fetch(`http://localhost:9292//pokemon_moves/${id}`, 
            { method: 'DELETE' })
    }
   return (

<Card style={{ width: '14rem', marginLeft: '40px'}}>
  <Card.Img variant="top" src={image} style={{width: '150px', marginLeft: '10%'}}/>
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>{description}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>
        <img src={types.image} style={{width: '50px', marginLeft: '33%'}}></img>
        <p style={{textAlign:'center'}}>{types.element}</p>
    </ListGroupItem>
    <ListGroupItem>HP: {hp}</ListGroupItem>
    <ListGroupItem>Height: {height}in</ListGroupItem>
  </ListGroup>
    <Card.Body>
        <Link to={`/pokemons/${id}/add_moves`}>
            <button>Learn Moves</button>
        </Link>
        <Link to={`/pokemons/${id}/edit`}>
            <button>Update</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
    </Card.Body>
</Card>
        /* <img src ={image}/>
        <p>{name}</p>
        <p>{type.element}</p>
        <p>{hp}</p>
        <p>{height}</p>
        <p>{description}</p>
        
        <Link to={`/pokemons/${id}/add_moves`}>
            <button 
            onClick={() => handleEdit(id)}
            >Learn Moves</button>
        </Link>
        <Link to={`/pokemons/${id}/edit`}>
            <button 
            onClick={() => handleEdit(id)}
            >Add Moves</button>
        </Link>

        <button onClick={handleDelete}>Delete</button> */
    
  )
}

export default Pokemon