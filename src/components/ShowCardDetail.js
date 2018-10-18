import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { splitTypeArray } from '../helpers';


class ShowCardDetail extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

    };

    handleChange(e, key) {
        const pokecard = this.props.cards[key];
        // take a copy of pokecard and update it with the new data
        const updateCard = {
        ...pokecard,
        [e.target.name]: e.target.value
        }
        this.props.updateCard(key, updateCard);
    };

    render(){

      return (
         <div>
            <Card>
               <CardBody className="main-area-details">
                  <CardTitle>#{this.props.currentPokemon.id} {this.props.currentPokemon.name}</CardTitle>
                  <CardSubtitle><strong>Native Region:</strong> {this.props.currentPokemon.region}</CardSubtitle>
                  <CardSubtitle><strong>Type:</strong> {splitTypeArray(this.props.currentPokemon.type)}</CardSubtitle>

               </CardBody>
               <CardImg src={this.props.img.imageUrlHiRes} alt={this.props.currentPokemon.name} className="cardDetail"/>
            </Card>
         </div>
      );
    }

}

export default ShowCardDetail;