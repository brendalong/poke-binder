import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';

class ShowDetail extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        var imgStyle = {
            width: '70hw',
          };
    };

    componentDidMount() {
        //lifecycle hook
        //console.log("showpokemon componentDidMount");
        console.log("show detail card", props.img);
    };
   

  

    handleChange(e, key) {
        const pokecard = this.props.cards[key];
        // take a copy of that song and update it with the new data
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
            <CardImg src={props.img} alt={props.currentPokemon.name} className="cardDetail"/>
            <CardBody>
            <CardTitle>#{props.currentPokemon.id} {props.currentPokemon.name}</CardTitle>
            <CardSubtitle>Native Region: {props.currentPokemon.region}</CardSubtitle>
            </CardBody>
            <select type="text" name="status" value={card.status | 'nowown'} placeholder="Not Own" onChange={(e) => this.handleChange(e, key)}>
                        <option value="own">Own</option>
                        <option value="nowown">Not Own</option>
                </select>
                <textarea type="text" name="desc" value={card.desc} placeholder="Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                
          </Card>
       </div>
    );
    }

}

export default ShowDetail;