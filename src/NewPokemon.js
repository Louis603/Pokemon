import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import { useNavigate } from "react-router";

function NewPokemon({types, newPokemon}) {
    let navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        hp: "",
        height: "",
        // weight: "", 
        description: "",
        image: "",
        type:"",
        type_id: ""
    })

    const allTypes = types.map(type => {
        return (
            <option 
            key={type.id}
            value= {type.id}>
                {type.element}
            </option>
        )
    })
    
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
        // console.log(form)
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch("http://localhost:9292/pokemons",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(resp => resp.json())
          .then(data => newPokemon(data))
          navigate("/pokemons")
          setForm({
            name: "",
            hp: "",
            height: "",
            // weight: "", 
            description: "",
            image: "",
            type:"",
            type_id: ""
          })
    }


  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Label column lg={2} >
          Name
        </Form.Label>
        <Col xs={2}>
            <Form.Control type="text" placeholder="Pokemon Name" name="name" value={form.name} onChange={handleChange}/>
        </Col>
        <Col xs={2}>
            <Form.Control type="number" placeholder="HP" name="hp" value={form.hp} onChange={handleChange}/>
        </Col>
        <Col xs={2}>
            <Form.Control type="number" placeholder="Height" name="height" value={form.height} onChange={handleChange}/>
        </Col>
        {/* <Col xs={2}>
            <Form.Control type="number" placeholder="Weight" name="weight" value={form.weight} onChange={handleChange}/>
        </Col> */}
        <Col xs={2}>
            <Form.Control as="textarea" type="text" placeholder="Description" name="description" value={form.description} onChange={handleChange}/>
        </Col>
        <Col xs={2}>
            <Form.Control type="link" placeholder="Image Url" name="image" value={form.image} onChange={handleChange}/>
        </Col>

        <Col xs={2}>
          <Form.Select name='type_id' value={form.type_id} onChange={handleChange} >
            <option >Type</option>
            {/* <option value= "1">Fire</option>
            <option value="2">Water</option>
            <option value="3">Grass</option> */}
            {allTypes}
          </Form.Select>
        </Col>

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </form>
  )
}

export default NewPokemon