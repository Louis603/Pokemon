import React from 'react'
import { Form, Button} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from "react";

function AddMoves({types, newMove}) {
    const [form, setForm] = useState({
        name: "",
        damage: "",
        type_id: ""
    })

    const allTypes = types.map(type => {
        return <option key={type.id} value= {type.id}> {type.element} </option>
    })

    function handleChange(e) {
        setForm({...form,[e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:9292/moves",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(resp => resp.json())
          .then(data => newMove(data))
          setForm({name: "", damage: "", type_id: ""})
    }

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Label column lg={2}>
            Add a new move to the list
        </Form.Label>
        <Col xs={2}>
            <Form.Control type="text" placeholder="Move Name" name="name" value={form.name} onChange={handleChange}/>
        </Col>
        <Col xs={1}>
            <Form.Control type="number" placeholder="Damage" name="damage" value={form.damage} onChange={handleChange}/>
        </Col>
        <Col xs={1}>
          <Form.Select name='type_id' value={form.type_id} onChange={handleChange}>
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

export default AddMoves