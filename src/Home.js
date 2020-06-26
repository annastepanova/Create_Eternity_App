import React from 'react'
import Typing from 'react-typing-animation'
import './Home.css'


const Home = () => {

  return (
    <div className="hp_quote">
      <Typing>
        <div>
          <Typing.Delay ms={700} />
          <span>"I've found it. </span> 
          <Typing.Delay ms={900} />
          <span>What? </span> 
          <Typing.Delay ms={900} />
          <span>Eternity. </span> <br/>
          <Typing.Delay ms={1100} />
          <span>It's the sun mingled with the sea."</span>
        </div>
      </Typing>
    </div>

  )

}


export default Home
