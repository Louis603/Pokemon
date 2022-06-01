import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";

function PokemonDetails({singlePoke, moves}) {
    const {name, hp, image, id} = singlePoke
    // const [pokeId, setPokeId] = useState(id)
    const [moveId, setMoveId] = useState()
    console.log(moves)
    const allAttacks = moves.map(move => {
        return (
            <option 
            key={move.id}
            value={move.id}>
                {move.name}
            </option>
        )
    })

    
    const allMoves = singlePoke.moves
    const moveList = allMoves.map(move => {
        return (
            <div key={id}>
                <p>{move.name}</p>
                <p>{move.damage}</p>
                <p>{move.type.element}</p>
            </div>
        )
    })

    function handleChange(e){
        setMoveId(e.target.value)
    }
  
    return (
    <div>
        <img src ={image}/>
        <p>{name}</p>
        {moveList}


        <h1> Add new moves!
        <form>
            <Col xs={2}>
                <Form.Select name='move_id' onChange={handleChange}>
                    <option>Moves</option>
                    {allAttacks}
                </Form.Select>
            </Col>
        </form>
        </h1>

    </div>
  )
}

export default PokemonDetails