import React from 'react'
import { Form, Button, Container, Card, ListGroup} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'

function PokemonDetails({moves}) {
    const [moveId, setMoveId] = useState()
    const [addedMove, setAddedMove] = useState({})
    //useState has to include a nested obj of types/moves or else throws error cus of the includes from controller
    const [singlePoke, setSinglePoke] = useState({
        moves: [],
        types: {}
    })
    console.log(singlePoke)

    const { id } = useParams()

    //fetch for single pokemon to include moves and types
    useEffect(() =>{
    fetch(`http://localhost:9292/pokemons/${id}`)
    .then(resp => resp.json())
    .then((data) => setSinglePoke(data))
  }, [id, addedMove]);

    // maps all moves into Card class
    const allMoves = singlePoke.moves
    const moveList = allMoves.map(moves => {
        return (
            <Card style={{ width: '15rem' }} key={moves.id}>
            <Card.Header>{moves.name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><b>Damage:</b> {moves.damage}</ListGroup.Item>
                <ListGroup.Item><b>Type:</b>  {moves.type.element} <img src={moves.type.image} style={{width: '17px', marginBottom: '3px'}}></img></ListGroup.Item>
            </ListGroup>
            </Card>
        )
    })

    //maps moves to add to pokemon
    const allAttacks = moves.map(move => {
        return (
            <option 
            key={move.name}
            value={move.id}>
                {move.name}
            </option>
        )
    })

    function handleChange(e){
        setMoveId(e.target.value)
    }

    //added moves actually POST into the join table and is not a PATCH
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
          .then(data => setAddedMove(data))
        
    }
  
    return (
        <div style={{textAlign: 'center'}}>
            <img src ={singlePoke.image} style={{width: '175px'}}/>
            <img src ={singlePoke.types.image} style={{width: '90px'}}/>
                <p>{singlePoke.name}</p>
            <Container >
            <Row className="g-2">
                {moveList}
            </Row>
            </Container>

            <h1> Add new moves!
            <form onSubmit={(e)=>handleSubmit(e)} style={{marginLeft: '45%'}}>
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