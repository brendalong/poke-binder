import React, { Component } from 'react';
import Navigation from './Navigation';
import ShowPokemon from './ShowPokemon';
import ShowDetail from './ShowDetail';
import ShowCards from './ShowCards';
import ShowCardDetail from './ShowCardDetail';
import { rebase } from '../constants';

import { Container, Row, Col, CardDeck } from 'reactstrap';


class View extends Component {
    constructor(props) {
      super(props);

        // getinitialState
        this.state = {
            currentView: "regions",
            currentRegion: "Kanto",
            pokeLoaded: false,
            pokemon: {},
            currentPokemon: {},
            currentCards: {},
            currentCard: null,
            cardIsLoaded: true,
            cardError: null,
            detailShowCritter: true,
            currentNotes:{},
            notesLoaded: false,
            myCards: {},
        };

        this.changeView = this.changeView.bind(this);
        this.changeRegion = this.changeRegion.bind(this);
        this.getPokemon = this.getPokemon.bind(this);
        this.clickPokeName = this.clickPokeName.bind(this);
        this.getCards = this.getCards.bind(this);
        this.clickCard = this.clickCard.bind(this);
        this.updateMyCards = this.updateMyCards.bind(this);
        this.addCard = this.addCard.bind(this);

        let activeName;

        // this.makeSearchObj = this.makeSearchObj.bind(this);
        // this.updateRegionState = this.updateRegionState.bind(this);
    }

    getPokemon(){
        console.log("getPokemon", this.state.currentView, this.state.currentRegion);
        let url;
        if (this.state.currentView === "regions"){
            // console.log("url", `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`);
            //look in regional
            url = `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`
        }else if (this.state.currentView === "a-z"){
            url = "https://bell-pokemon.firebaseio.com/allPokemon.json"
        }
        fetch(url)
        .then(res => res.json())
        .then(
           (result) => {
            //   if (this.state.currentView === "regions") {
                //for regional
               //aphabatize and add fbID
               let newArray;
               if (this.state.currentView === "regions"){
                    newArray = Object.keys(result).map((key, index) => {
                        result[key].fbid = key;
                        return result[key];
                    });

                    newArray.sort(function(a, b) {
                        var textA = a.pName;
                        var textB = b.pName;
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });
                }else if (this.state.currentView === "a-z"){
                    newArray = Object.keys(result).map((key, index) => {
                        result[key].fbid = key;
                        return result[key];
                    });
                    newArray.sort(function(a, b) {
                        var textA = a.name;
                        var textB = b.name;
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });

                }
               //need to write for mine

            this.setState({
               pokeLoaded: true,
               pokemon: newArray,
              });
           },
           // Note: it's important to handle errors here
           // instead of a catch() block so that we don't swallow
           // exceptions from actual bugs in components.
           (error) => {
               console.log("error", error);
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    componentWillMount() {
    // this runs right before the <App> is rendered
        this.ref = rebase.syncState(`/mine`, {
        context: this,
        state: 'myCards'
        });
    }

    componentWillUnmount() {
        rebase.removeBinding(this.ref);
    }

    componentDidMount() {
        //lifecycle hook
        console.log("componentDidMount");
        this.getPokemon();
        this.dataHandler();
    }

    dataHandler(){
        const userRef = rebase.initializedApp.database().ref('mine');
        console.log("view dataHandler", userRef);

        // query the firebase once for the user data
        userRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //snapshot - how does it look right now.
            console.log("data", data);
        });
    }

    changeView(event){
       console.log("changeView event", event.target.id);

        this.setState({
         currentView: event.target.id,
         pokeLoaded: false,
         pokemon: {},
         error: null,
            currentPokemon: {},
            currentCards: {},
            currentCard: null,
            cardIsLoaded: false,
            cardError: null,
            detailShowCritter: true,
            currentNotes:{},
            notesLoaded: false,
            myCards: {},
        }, this.getPokemon);
    }

    changeRegion(event){
       console.log("changeRegion", event.target.id);

       this.setState( {
          currentRegion: event.target.id,
          pokeLoaded: false,
          pokemon: {},
          error: null,
            currentPokemon: {},
            currentCards: {},
            currentCard: null,
            cardIsLoaded: false,
            cardError: null,
            detailShowCritter: true,
            currentNotes:{},
            notesLoaded: false,
            myCards: {},
       }, this.getPokemon);

    }



    makeSearchObj(){
        console.log("makeObj", this.state.currentRegion);
        let searchObj = {
            currentView: this.state.currentView,
            currentRegion: this.state.currentRegion,
        }
        return searchObj;
    }



    getCards(){
        console.log("getCards", this.state.currentPokemon);
        let url = `https://api.pokemontcg.io/v1/cards?name=${this.state.currentPokemon.name}`;
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result);

                this.setState({
                    currentCards: result.cards,
                });
            },
        (error) => {
            console.log("error", error);
             this.setState({
                 cardIsLoaded: true,
                 cardError: error
             });
        });
    }

    clickCard(obj){
        console.log("whichOne", obj);
        //call to get card by id 
        //https://api.pokemontcg.io/v1/cards?id=xy12-18

        this.setState({
            detailShowCritter: false,
            currentCard: obj,
            currentNotes: {},
            notesLoaded: false,
        });
    }

    addCard(card) {
        // update our state
        const myCards = {...this.state.myCards};
        // add in our new fish
        const timestamp = Date.now();
        myCards[`card-${timestamp}`] = card;
        // set state
        this.setState({ myCards });
      }

    updateMyCards = (key, updatedCard) => {
        const myCards = {...this.state.myCards};
        myCards[key] = updatedCard;
        this.setState({ myCards });
      };

    clickPokeName(whichOne){
        let url = `https://bell-pokemon.firebaseio.com/allPokemon.json?orderBy="slug"&equalTo="${whichOne}"`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
           console.log("the data of clickpokeName", data);
            //need to get data out of key

            let key = Object.keys(data)[0];
            data[key].fbID = key;
            this.setState({
                currentPokemon: data[key],
                detailShowCritter: true,
                currentCard: null,
            }, this.getCards);
        })
        .catch(err => console.log(err));
    }

    render(){
        const { currentView, currentRegion, pokemon, pokeLoaded, currentPokemon, currentCards, currentCard, detailShowCritter, myCards} = this.state;
        let showDetail;
        let showCards;

        if (detailShowCritter){
            if (currentPokemon.name){
                showDetail = <ShowDetail currentPokemon={currentPokemon} col-6 />;
            }
        } else {
            if (currentCard){
                showDetail = <ShowCardDetail img={currentCard} currentPokemon={currentPokemon} col-6/>
            }
        }

        if (currentCards.length > 0){
            showCards = <ShowCards cards={currentCards} 
                        clickCard={this.clickCard} 
                        updateMyCards={this.updateMyCards} 
                        myCards={myCards} 
                        addCard={this.addCard} />
        }
        return (
            <div >
                <Navigation
                    currentView={currentView}
                    changeView={this.changeView}
                    currentRegion={currentRegion}
                    changeRegion={this.changeRegion}
                    pokeLoaded={this.pokeLoaded} />
                    <div className="container-fluid">
                        <div class="row">
                    <div class="col-2 poke-list">
                        {/*<ShowPokemon whichView={currentView} searchObj={searchObj}/>*/}
                        <ShowPokemon pokemon={pokemon}  currentView={currentView} clickPokeName={this.clickPokeName} />
                    </div>
                    <div class="col-6 poke-details">
                        {showDetail}
                    </div>
                    <div class="col-4 poke-cards">
                        {showCards}
                    </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default View;