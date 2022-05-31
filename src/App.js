import logo from './logo.svg';
// import './App.css';
import React, {useEffect, useState} from 'react';
import PokemonList from './PokemonList'
import Header from './Header'
import NewPokemon from './NewPokemon'

function App() {
  const [pokemonArr, setpokemonArr] =useState([])

  useEffect(() =>{
    fetch("http://localhost:9292/pokemons")
    .then(resp => resp.json())
    .then((data) => setpokemonArr(data))
  }, []);


  return (
    <div className="App">
      <Header />
      <PokemonList pokemons={pokemonArr}/>
      <NewPokemon/>
    </div>
  );
}

export default App;
