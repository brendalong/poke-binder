import React, { Component } from 'react';
import RenderCard from './RenderCard';

// let compareArray;

class ShowCards extends Component {
    state = {

    }

    objMap = (key) => {
         //cycle through mine and this.props.cards and find matches, tag this.props.cards with property of oneOfMine
        let propsCards = [...this.props.cards];
         propsCards.forEach((element) => {
            if (this.props.myCards[key].id === element.id){
                element.oneOfMine = this.props.myCards[key].oneOfMine;
                element.notes = this.props.myCards[key].notes || null;
                element.status = this.props.myCards[key].status || "caught";
                element.mycardid = key;
            }
        });
        return propsCards;
    }

    compareMyCards(myCards){
        let cards = Object.keys(myCards).map((this.objMap));
        return cards[0];
    }

    componentDidMount() {

    }

    render(){
      let newCardArray = this.compareMyCards(this.props.myCards) || this.props.cards;

         return (
            <React.Fragment>
               {Object.keys(newCardArray).map((key) => {
                  const card = newCardArray[key];
                    return <RenderCard
                    key={key}
                    item={key}
                    card={card}
                    addCard={this.props.addCard}
                    currentPokemon={this.props.currentPokemon.slug}
                    updateMyCards={this.props.updateMyCards}
                    clickCard={this.props.clickCard}
                    auth={this.props.auth}
                    loginWithGoogle={this.props.loginWithGoogle}/>
                })
                }
            </React.Fragment>
         );
      }
}
export default ShowCards;