import React from 'react'
import {Carousel} from 'react-bootstrap/'
import {useState, useEffect} from 'react'

function Home() {
  const [type,setType] = useState({})
  const [poke, setPoke] = useState()
  const [move, setMove] = useState({})
  
  useEffect(() =>{
    fetch("http://localhost:9292/types/most_often")
    .then(resp => resp.json())
    .then((data) => setType(data))
  }, []);
  console.log(type)
  
  useEffect(() =>{
    fetch("http://localhost:9292/pokemon/most_often")
    .then(resp => resp.json())
    .then((data) => setPoke(data))
  }, []);
 
  useEffect(() =>{
    fetch("http://localhost:9292/moves/most_often")
    .then(resp => resp.json())
    .then((data) => setMove(data))
  }, []);
  console.log(move)

  return (
    <div>
      <h1 style={{marginLeft: '25%'}}>Personal Pokedex</h1>
      <Carousel fade style={{width: '300px', marginLeft: '25%', marginTop: '2%'}} variant="dark">
  <Carousel.Item>
    <img style={{width: '40px'}}
      className="d-block w-100"
      src="https://wallpaperaccess.com/full/5818306.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 style={{marginBottom: '110px', marginRight: '30px'}}>Most Common Pokemon</h3>
      <img style={{width: '80px', marginBottom: '50px', marginRight: '85px'}} 
      src={poke}></img>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpaperaccess.com/full/5818306.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3 style={{marginBottom: '135px', marginRight: '30px'}}>Most Common Move</h3>
      <h4 style={{marginBottom: '75px', marginRight: '85px'}}>{move.name}</h4>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpaperaccess.com/full/5818306.jpg"
      alt="Third slide"
    />

    <Carousel.Caption >
      <h3 style={{marginBottom: '120px', marginRight: '30px'}}>Most Common Type</h3>
      <img style={{width: '50px', marginBottom: '65px', marginRight: '85px'}} 
      src={type.image}></img>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </div>
  )
}

export default Home