import React, { Component } from 'react';
import Navigation from './Navigation';
import ShowPokemon from './ShowPokemon';
import ShowDetail from './ShowDetail';
import ShowCards from './ShowCards';
import ShowCardDetail from './ShowCardDetail';
import {rebase, googleProvider, app} from '../constants';
import APIManager from '../modules/dbcalls';



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
        auth: false,
        user: {}
    };

    getPokemon = () => {
        // let url;
        let dataTable;
        if (this.state.currentView === "regions"){
            //look in regional
            dataTable = `regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`
        }else if (this.state.currentView === "a-z"){
            dataTable = "allPokemon.json"
        }else if (this.state.currentView === "mine"){
           dataTable = "mine.json"
        }

        APIManager.getAll(dataTable)
        .then(
           (result) => {
                //add fbID 
                let newArray = Object.keys(result).map((key, index) => {
                    result[key].fbid = key;
                    return result[key];
                });
                //alphabetize
                let regionsProp = "pName";
                let azProp = "name";
                let propVal;

                if (this.state.currentView === "regions"){
                    propVal = regionsProp;
                }else if (this.state.currentView === "a-z"){
                    propVal = azProp;
                }
                //TODO Add one for mine
                newArray.sort(function(a, b) {
                    var textA = a[propVal];
                    let textB = b[propVal];
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });

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
        ).then((result) =>{
            this.setState({
                pokeLoaded: true,
                pokemon: result,
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

    changeAuth = (event) => {
        if(event.target.id === "login"){
            console.log("show login");
        }else {
            console.log("time to logout");
        }
    }

    changeView = (event) => {
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
        APIManager.getCards(this.state.currentPokemon.name)
        .then((result) => {
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
        APIManager.getOneDetails(whichOne)
        .then(data => {
            
            //get data out of key
            let key = Object.keys(data)[0];
            data[key].fbID = key;
            console.log("newdata", data[key]);
            this.setState({
                currentPokemon: data[key],
                detailShowCritter: true,
                currentCard: null,
                currentCards: null,
            }, this.getCards);
        })
        .catch(err => console.log(err));
    }
//reference articles
// https://coderjourney.com/tutorials/how-to-add-authentication-to-react-with-firebase/
// https://firebase.google.com/docs/auth/web/google-signin

    updateUser=(user)=>{
        this.setState({
            auth: true,
            user: user.uid,
        })
    }

    loginWithGoogle = () => {
        console.log("login with google called");
        app.auth().signInWithPopup(googleProvider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            
            const user = result.user;
            console.log("what is result user", user);
            this.updateUser(user);
            //now have user
            //need to setstate with user
            //need to sync user db 
            // ...
          }).catch(function(error) {
              console.log("error", error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    logout = () => {
        app.auth().signOut().then(function() {
            // Sign-out successful.
            //need to get rid of binding
            // rebase.removeBinding(this.ref);
            this.setState({
                auth: false,
                user: null,
            })
          }).catch(function(error) {
            // An error happened.
          });
    }

   authHandler = (e) => {
    console.log("authHandler", e);
    }

    render(){
        const { currentView, currentRegion, pokemon, pokeLoaded, currentPokemon, currentCards, currentCard, detailShowCritter, myCards, auth} = this.state;
        let showDetail;
        let showCards;
        let showList;

        if (detailShowCritter){
            if (currentPokemon.name){
                showDetail = <ShowDetail currentPokemon={currentPokemon} />;
            }else{
                showDetail =  <div className="instructions"><p>&#8592; Get started by choosing a Pokemon</p></div>
            }
        } else {
            if (currentCard){
                showDetail = <ShowCardDetail img={currentCard} currentPokemon={currentPokemon}/>
            }
        }

        if (currentCards && currentCards.length > 0){
            showCards = <ShowCards cards={currentCards}
                        clickCard={this.clickCard}
                        updateMyCards={this.updateMyCards}
                        myCards={myCards}
                        addCard={this.addCard}
                        currentPokemon={currentPokemon} 
                        auth={auth} 
                        loginWithGoogle={this.loginWithGoogle}/>
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
                    pokeLoaded={this.pokeLoaded} 
                    auth={this.state.auth} 
                    changeAuth={this.changeAuth} 
                    loginWithGoogle={this.loginWithGoogle}/>
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