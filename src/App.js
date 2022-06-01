import logo from './logo.svg';
// import './App.css';
import { Route, Routes,useNavigate } from "react-router";
import React, {useEffect, useState} from 'react';
import PokemonList from './PokemonList'
import Header from './Header'
import NewPokemon from './NewPokemon'
import PokemonDetails from './PokemonDetails'

function App() {
  const [pokemonArr, setpokemonArr] = useState([])
  const [types, setTypes] = useState([])
  const [moves, setMoves] = useState([])
  const [singlePoke, setSinglePoke] = useState({})
  const [editId, setEditId] = useState(1)
//GET requests for pokemons
  useEffect(() =>{
    fetch("http://localhost:9292/pokemons")
    .then(resp => resp.json())
    .then((data) => setpokemonArr(data))
  }, []);

  //GET request for moves
  useEffect(() =>{
    fetch("http://localhost:9292/moves")
    .then(resp => resp.json())
    .then(data => setMoves(data))
  }, [])

  //GET request for TYPES
  useEffect(() =>{
    fetch("http://localhost:9292/types")
    .then(resp => resp.json())
    .then(data => setTypes(data))
  }, [])

  //new pokemon form data
  function newPokemon(data){
    setpokemonArr([...pokemonArr, data])
  }

  //edit ID fetch
  function handleEdit(id){
    setEditId(id)

    // useEffect(() =>{
      // fetch(`http://localhost:9292/pokemons/${id}`)
      // .then(resp => resp.json())
      // .then((data) => setSinglePoke(data))
    // }, []);
  }
  useEffect(() =>{
    fetch(`http://localhost:9292/pokemons/${editId}`)
    .then(resp => resp.json())
    .then((data) => setSinglePoke(data))
  }, [editId]);

  //move submit data
  function handleMovesEdit(data){
    console.log({...singlePoke.moves, data})
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
          <PokemonList pokemons={pokemonArr} handleEdit={handleEdit}/>} 
        />
        <Route path="/new" element={
          <NewPokemon types={types} newPokemon={newPokemon}/>} 
        />
        <Route path="/pokemons/:id/edit" element={
          <PokemonDetails singlePoke={singlePoke} 
            moves={moves} 
            handleMovesEdit={handleMovesEdit}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
