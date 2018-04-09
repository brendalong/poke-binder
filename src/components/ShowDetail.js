import React from 'react';

//Functional components just receive props (which we destructured with ES6) as arguments and return JSX to be rendered.

function ShowDetail(props){
   console.log("show detail Image", props.currentPokemon.FullImageURL);
    return (
       <div>
          <img src={props.currentPokemon.FullImageURL} alt={props.currentPokemon.name}/>
          <h3>#{props.currentPokemon.id} {props.currentPokemon.name}</h3>
          <h3>Original Region: {props.currentPokemon.region}</h3>
       </div>
    );
}

export default ShowDetail;