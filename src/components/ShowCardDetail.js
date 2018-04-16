import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';

class ShowCardDetail extends Component {

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
       console.log("componentDidMount showDetailCard", this.props.img.imageUrlHiRes);
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
            {/*<select type="text" name="status" value={this.props.status} placeholder="Not Own" onChange={(e) => this.handleChange(e, key)}>
                        <option value="own">Own</option>
                        <option value="like">Like</option>
                        <option value="noown">Not Own</option>
            </select>
            <textarea type="text" name="desc" value={card.desc} placeholder="Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
            */}
            </Card>
         </div>
      );
    }

}

export default ShowCardDetail;