import logo from './logo.svg';
// import './App.css';
import { Route, Routes,useNavigate } from "react-router";
import React, {useEffect, useState} from 'react';
import PokemonList from './PokemonList'
import Header from './Header'
import NewPokemon from './NewPokemon'
import PokemonDetails from './PokemonDetails'
import AddMoves from './AddMoves'
import Home from './Home'
import PokemonDescription from './PokemonDescription';

function App() {
  const [pokemonArr, setpokemonArr] = useState([])
  const [types, setTypes] = useState([])
  const [moves, setMoves] = useState([])
  const [singlePoke, setSinglePoke] = useState({})

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

  //new move form data
  function newMove(data){
    setMoves([...moves, data])
  }

  //pokemon delete ID
  function deletedPoke(data){
    const newPokeArr = pokemonArr.filter(poke => poke.id !== data)
    setpokemonArr(newPokeArr)
  }

  //pokemon edit info
  function handlePokeEdit(data){
    setpokemonArr(pokemonArr.map(pokemon => pokemon.id === data.id ? data : pokemon))
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/pokemons" element={
          <PokemonList pokemons={pokemonArr} deletedPoke={deletedPoke}/>} 
        />
        <Route path="/new" element={
          <NewPokemon types={types} newPokemon={newPokemon}/>} 
        />
        <Route path="/pokemons/:id/add_moves" element={
          <PokemonDetails
            moves={moves}
            
            />}
        />
        <Route path="/pokemons/:id/edit" element={
          <PokemonDescription
          handlePokeEdit={handlePokeEdit} 
            />}
        />
        <Route path="/new_moves" element={
          <AddMoves types={types} newMove={newMove}/>} 
        />
      </Routes>
    </div>
  );
}

export default App;
