import React from 'react'
import { Form, Button, Container, Card, ListGroup} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'

function PokemonDetails({moves}) {
    const [moveId, setMoveId] = useState()
    const [addedMove, setAddedMove] = useState({})
    const [singlePoke, setSinglePoke] = useState({
        moves: []
    })

    const { id } = useParams()

    useEffect(() =>{
    fetch(`http://localhost:9292/pokemons/${id}`)
    .then(resp => resp.json())
    .then((data) => setSinglePoke(data))
  }, [id, addedMove]);

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
            // <div key={moves.id} style={{ width: '10rem' , marginRight: 20}}>
            //     <h4>{moves.name}</h4>
            //     <p><b>Damage:</b> {moves.damage}</p>
            //     <p><b>Type:</b>  {moves.type.element}</p>
            // </div>
        )
    })

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
            <img src ={singlePoke.image}/>
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