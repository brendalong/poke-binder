import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

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
         <Card >
            <CardImg src={this.props.img.imageUrlHiRes} alt={this.props.currentPokemon.name} className="cardDetail"/>
            <CardBody>
            <CardTitle>#{this.props.currentPokemon.id} {this.props.currentPokemon.name}</CardTitle>
            <CardSubtitle>Native Region: {this.props.currentPokemon.region}</CardSubtitle>
            </CardBody>
            </Card>
         </div>
      );
    }

}

export default ShowCardDetail;