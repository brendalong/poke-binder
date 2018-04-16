import React, { Component } from 'react';


class ShowCards extends Component {
    constructor(props) {
        super(props);
        console.log("card props", this.props.cards);
        this.renderCards = this.renderCards.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        // let searchObj = props.searchObj;
        // this.state = {
        //     pokemon: searchObj.pokemon,
        //     pokeLoaded: searchObj.pokeLoaded,
        //     error: null,
        //     currentRegion: searchObj.currentRegion
        // }
    }

   

    componentDidMount() {
        //lifecycle hook
        console.log("showCards componentDidMount");
    }

     renderCards(key) {  
        const card = this.props.cards[key];
        // console.log("render cards", key, card.imageUrl);
        return (
            <div className="card-item" key={key}>
                <img src={card.imageUrl} alt={card.name} onClick={() => {this.props.clickCard(card.imageUrlHiRes)}}/>    
            </div>
        )
      }

    render(){
         return (
            <div>
               {Object.keys(this.props.cards).map(this.renderCards)}
            </div>
         );
      }
}
export default ShowCards; 