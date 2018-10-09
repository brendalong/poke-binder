import React, { Component } from 'react';
import Navigation from './Navigation';
import ShowPokemon from './ShowPokemon';
import ShowDetail from './ShowDetail';
import ShowCards from './ShowCards';
import ShowCardDetail from './ShowCardDetail';
import { rebase } from '../constants';


class View extends Component {
    state = {
        currentView: "regions",
        currentRegion: "Kanto",
        pokeLoaded: false,
        pokemon: [],
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

    getPokemon = () => {
        let url;
        if (this.state.currentView === "regions"){
            //look in regional
            url = `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`
        }else if (this.state.currentView === "a-z"){
            url = "https://bell-pokemon.firebaseio.com/allPokemon.json"
        }else if (this.state.currentView === "mine"){
           url = "https://bell-pokemon.firebaseio.com/mine.json"
        }

        fetch(url)
        .then(res => res.json())
        .then(
           (result) => {
               //aphabatize and add fbID
               console.log("new result", result);
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
               //  }else if (this.state.currentView === "mine") {
               //    console.log("in the MINE", );
               //    newArray = Object.keys(result).map((key, index) => {
               //       result[key].fbid = key;
               //       return result[key];
               //    });
               //    newArray.sort(function (a, b) {
               //       var textA = a.name;
               //       var textB = b.name;
               //       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
               //    });
               // }

            return newArray;
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
        ).then((newArray) =>{
            this.setState({
                pokeLoaded: true,
                pokemon: newArray,
               });
        });
    }

    componentWillMount() {
        //this runs right before the <App> is rendered
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
        this.getPokemon();
        this.dataHandler();
    }

    dataHandler(){
        const userRef = rebase.initializedApp.database().ref('mine');

        // query the firebase once for the user data
        userRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //snapshot - how does it look right now.
        });
    }

    changeView = (event) => {
       console.log("event", event);
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
        }, this.getPokemon);
    }

    changeRegion = (event) => {
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
       }, this.getPokemon);

    }



    makeSearchObj(){
        let searchObj = {
            currentView: this.state.currentView,
            currentRegion: this.state.currentRegion,
        }
        return searchObj;
    }



    getCards = () => {
        let url = `https://api.pokemontcg.io/v1/cards?name=${this.state.currentPokemon.name}`;
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    currentCards: result.cards,
                });
            },
        (error) => {
             this.setState({
                 cardIsLoaded: true,
                 cardError: error
             });
        });
    }

    clickCard = (obj) => {
        //call to get card by id
        //https://api.pokemontcg.io/v1/cards?id=xy12-18

        this.setState({
            detailShowCritter: false,
            currentCard: obj,
            currentNotes: {},
            notesLoaded: false,
        });
    }

    addCard = (card) => {
        // update state
        const myCards = {...this.state.myCards};
        // add in the new card
        const timestamp = Date.now();
        myCards[`card-${timestamp}`] = card;
        myCards[`card-${timestamp}`].mycardid = `card-${timestamp}`;
        // set state
        this.setState({ myCards });
      }

    updateMyCards = (key, updatedCard) => {
        const myCards = {...this.state.myCards};
        myCards[key] = updatedCard;
        this.setState({ myCards });
      };

    clickPokeName = (whichOne) => {
      whichOne = whichOne.toLowerCase();
        let url = `https://bell-pokemon.firebaseio.com/allPokemon.json?orderBy="slug"&equalTo="${whichOne}"`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            //get data out of key

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
        let showList;

        if (detailShowCritter){
            if (currentPokemon.name){
                showDetail = <ShowDetail currentPokemon={currentPokemon} />;
            }
        } else {
            if (currentCard){
                showDetail = <ShowCardDetail img={currentCard} currentPokemon={currentPokemon}/>
            }
        }

        if (currentCards.length > 0){
            showCards = <ShowCards cards={currentCards}
                        clickCard={this.clickCard}
                        updateMyCards={this.updateMyCards}
                        myCards={myCards}
                        addCard={this.addCard}
                        currentPokemon={currentPokemon} />
        }

        if (pokeLoaded){
            showList = <ShowPokemon pokemon={pokemon} currentView={currentView} clickPokeName={this.clickPokeName} />
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
                    <div className="row">
                        <div className="col-2 poke-list">
                          {showList}
                        </div>
                        <div className="col-6 poke-details">
                            {showDetail}
                        </div>
                        <div className="col-4 poke-cards">
                            {showCards}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;