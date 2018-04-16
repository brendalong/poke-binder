import React from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';

function ShowDetail(props){
   console.log("show detail card", props.img);

   var imgStyle = {
    width: '70hw',
  };

    return (
       <div>
       <Card >
            <CardImg src={props.img} alt={props.currentPokemon.name} className="cardDetail"/>
            <CardBody>
            <CardTitle>#{props.currentPokemon.id} {props.currentPokemon.name}</CardTitle>
            <CardSubtitle>Native Region: {props.currentPokemon.region}</CardSubtitle>
            </CardBody>
          </Card>
       </div>
    );
}

export default ShowDetail;