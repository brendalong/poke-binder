import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {splitTypeArray} from '../helpers';


function ShowDetail(props){
   console.log("show detail Image", props.currentPokemon.FullImageURL);
    return (
       <div>
       <Card>
          <CardImg src={props.currentPokemon.FullImageURL} alt={props.currentPokemon.name}/>
          <CardBody>
            <CardTitle>#{props.currentPokemon.id} {props.currentPokemon.name}</CardTitle>
            <CardSubtitle>Native Region: {props.currentPokemon.region}</CardSubtitle>
            <CardBody><strong>Type:</strong> {splitTypeArray(props.currentPokemon.type)}</CardBody>
            </CardBody>
          </Card>
       </div>
    );
}

export default ShowDetail;