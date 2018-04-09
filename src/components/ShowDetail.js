import React from 'react';

//Functional components just receive props (which we destructured with ES6) as arguments and return JSX to be rendered.

function ShowDetail(props){
    console.log("Image", props);
    return (
       <div>
       <p>Goes HERE {props.FullImageURL}</p>
        <img src={props.FullImageURL}  alt={props.pName}/>
       </div>
    );
}

export default ShowDetail;