import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {splitTypeArray} from '../helpers';


function ShowDetail(props){
    return (
       <React.Fragment>
          <Card >
             <CardBody className="main-area-details">
            <CardTitle>#{props.currentPokemon.id} {props.currentPokemon.name}</CardTitle>
                <CardSubtitle><strong>Native Region:</strong> {props.currentPokemon.region}</CardSubtitle>
                <CardSubtitle><strong>Type:</strong> {splitTypeArray(props.currentPokemon.type)}</CardSubtitle>
            </CardBody>
             <CardImg src={props.currentPokemon.FullImageURL} alt={props.currentPokemon.name} />
          </Card>
       </React.Fragment>
    );
}

export default ShowDetail;