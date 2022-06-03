import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import {useState} from "react";
import { useNavigate } from "react-router";

function NewPokemon({types, newPokemon}) {
    let navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        hp: "",
        height: "",
        description: "",
        image: "",
        type:"",
        type_id: ""
    })

    //maps Type array into selector options // value is Type.id which is put into type_id as foreign key
    const allTypes = types.map(type => {
        return <option  key={type.id} value= {type.id}> {type.element} </option>
        
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
        <Col xs={2}>
            <Form.Control as="textarea" type="text" placeholder="Description" name="description" value={form.description} onChange={handleChange}/>
        </Col>
        <Col xs={2}>
            <Form.Control type="link" placeholder="Image Url" name="image" value={form.image} onChange={handleChange}/>
        </Col>

        <Col xs={2}>
          <Form.Select name='type_id' value={form.type_id} onChange={handleChange} >
            <option >Type</option>
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