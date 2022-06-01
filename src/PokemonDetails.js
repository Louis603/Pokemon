import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";

function PokemonDetails({singlePoke, moves, handleMovesEdit}) {
    const {name, hp, image, id} = singlePoke
    // const [pokeId, setPokeId] = useState(id)
    const [moveId, setMoveId] = useState()
    console.log(moves)
    const allAttacks = moves.map(move => {
        return (
            <option 
            key={move.name}
            value={move.id}>
                {move.name}
            </option>
        )
    })

    
    const allMoves = singlePoke.moves
    const moveList = allMoves.map(move => {
        return (
            <div key={move.id}>
                <p>{move.name}</p>
                <p>{move.damage}</p>
                <p>{move.type.element}</p>
            </div>
        )
    })

    function handleChange(e){
        setMoveId(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const pokeMoves = {
            move_id: moveId,
            pokemon_id: id
        }
        fetch(`http://localhost:9292/pokemons/${id}/add_moves`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokeMoves)
        }).then(resp => resp.json())
          .then(data => handleMovesEdit(data))
        
    }
    console.log(id)
  
    return (
    <div>
        <img src ={image}/>
        <p>{name}</p>
        {moveList}


        <h1> Add new moves!
        <form onSubmit={(e)=>handleSubmit(e)}>
            <Col xs={2}>
                <Form.Select name='move_id' onChange={handleChange}>
                    <option>Moves</option>
                    {allAttacks}
                </Form.Select>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Col>
        </form>
        </h1>

    </div>
  )
}

export default PokemonDetails