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

        // this.state = {
        //     cardDetail: {},
        //     isLoaded: false,
        //     cardId: null,
        // }
    };

    // componentDidMount() {
    //     //lifecycle hook
    //     //console.log("showpokemon componentDidMount");
    //    console.log("componentDidMount showDetailCard", this.props.img);
    // };

    // getNotes(whichOne){
    //     let url = `https://bell-pokemon.firebaseio.com/mine.json?orderBy="cardId"&equalTo="${whichOne}"`;
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //        console.log("the data of clickpokeName", data);
    //         //need to get data out of key

    //         let key = Object.keys(data)[0];
    //         data[key].fbID = key;
    //         this.setState({
    //             currentCard: data[key],
    //             notes: true,
    //             status: null,
    //         });
    //     })
    //     .catch(err => console.log(err));
    // }

    // componentWillMount() {
    //     // this runs right before the rendered
    //     this.ref = rebase.syncState(`/mine/${this.props.user}/songs`, {
    //        context: this,
    //        state: 'cardDetail'
    //      });
    //    }

    // componentWillUnmount() {
    //     rebase.removeBinding(this.ref);
    // }



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
                        <option value="caught">Caught</option>
                        <option value="want">Want</option>
                        <option value="wild">Wild</option>
            </select>
            <textarea type="text" name="desc" value={card.desc} placeholder="Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
            */}
            </Card>
         </div>
      );
    }

}

export default ShowCardDetail;