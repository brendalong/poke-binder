import React, { Component } from 'react';
import RenderCard from './RenderCard';


class ShowCards extends Component {
    state = {
        cards: []
    }

    objMap = (key) => {
         //cycle through mine and this.props.cards and find matches, tag this.props.cards with property of oneOfMine
        this.props.cards.forEach((element) => {
            if (this.props.myCards[key].id === element.id){
                element.oneOfMine = this.props.myCards[key].oneOfMine;
                element.notes = this.props.myCards[key].notes || null;
                element.status = this.props.myCards[key].status || "caught";
                element.mycardid = key;
            }
        });
    }

    compareMyCards(){
        Object.keys(this.props.myCards).map((this.objMap))
    }

    //TODO - fix refresh of cards
    componentDidMount() {
       this.setState({
           cards: this.props.cards,
       })
    }

    render(){
        this.compareMyCards();
         return (
            <div>
               {Object.keys(this.state.cards).map((key) => {
                    const card = this.state.cards[key];
                    return <RenderCard 
                    key={key} 
                    item={key} 
                    card={card} 
                    addCard={this.props.addCard} 
                    currentPokemon={this.props.currentPokemon.slug}
                    updateMyCards={this.props.updateMyCards} />
                })
                }
            </div>
         );
      }
}
export default ShowCards;