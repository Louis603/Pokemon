import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'

function PokemonDescription({handlePokeEdit}) {
    //useState has to include a nested obj of types or else throws error cus of the includes from controller
    const [singlePoke, setSinglePoke] = useState({ 
        types:{} 
    })
    const [form, setForm] = useState({
        name: "",
        hp: "",
        height: "",
        description: "",
    })

    const { id } = useParams()

    useEffect(() =>{
        fetch(`http://localhost:9292/pokemons/${id}`)
        .then(resp => resp.json())
        .then((data) => {
            setSinglePoke(data)
            setForm(data)
        })
      }, [id, handlePokeEdit]);


      function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
      e.preventDefault()
      fetch(`http://localhost:9292/pokemons/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    }).then(resp => resp.json())
      .then(data => handlePokeEdit(data))
    }

  return (
    <div style={{textAlign: 'center'}}>
        <img src ={singlePoke.image}/>
        <p>{singlePoke.name}</p>
        <p>{singlePoke.types.element}</p>
        <img 
        src={singlePoke.types.image}
        style={{width: '50px'}}>
        </img>
        <p>HP: {singlePoke.hp}</p>
        <p>Height: {singlePoke.height}in</p>
        <p>Description: {singlePoke.description}</p>

        <form onSubmit={(e)=>handleSubmit(e)} >
            <Form.Label column lg={10} >
            <h4>Update {singlePoke.name}</h4>
            </Form.Label>
            <Col xs={2} style={{marginLeft: '42%'}}>
                <Form.Control type="text" placeholder="Pokemon Name" name="name" value={form.name} onChange={handleChange}/>
            </Col>
            <Col xs={2} style={{marginLeft: '42%'}}>
                <Form.Control type="number" placeholder="HP" name="hp" value={form.hp} onChange={handleChange}/>
            </Col>
            <Col xs={2} style={{marginLeft: '42%'}}>
                <Form.Control type="number" placeholder="Height" name="height" value={form.height} onChange={handleChange}/>
            </Col>
            <Col xs={2} style={{marginLeft: '42%'}}>
                <Form.Control as="textarea" type="text" placeholder="Description" name="description" value={form.description} onChange={handleChange}/>
            </Col>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </form>
        

    </div>
  )
}

export default PokemonDescription