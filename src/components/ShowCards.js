import React, { Component } from 'react';
import RenderCard from './RenderCard';


class ShowCards extends Component {
    state = {
        cards: [],
        currentPokemon: {},
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

    compareMyCards(myCards){
        Object.keys(myCards).map((this.objMap))
    }

    componentDidMount() {
       this.setState({
           cards: this.props.cards,
           currentPokemon: this.props.currentPokemon,
       })
    }

    render(){
        console.log("render showcards");
        this.compareMyCards(this.props.myCards);
         return (
            <div>
               {Object.keys(this.props.cards).map((key) => {
                    const card = this.props.cards[key];
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
            </div>
         );
      }
}
export default ShowCards;