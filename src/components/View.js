import React, { Component } from 'react';
import Navigation from './Navigation';
import ShowPokemon from './ShowPokemon';
import ShowDetail from './ShowDetail';




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
        };

        this.changeView = this.changeView.bind(this);
        this.changeRegion = this.changeRegion.bind(this);
        this.getPokemon = this.getPokemon.bind(this);
        this.clickPokeName = this.clickPokeName.bind(this);
        // this.getPokemon = this.getPokemon.bind(this);
        // this.setState = this.setState.bind(this);
        // this.makeSearchObj = this.makeSearchObj.bind(this);
        // this.updateRegionState = this.updateRegionState.bind(this);
    }

    getPokemon(){
        // let searchObj = this.makeSearchObj();

        console.log("getPokemon", this.state.currentRegion);
        let url;
        if (this.state.currentView === "regions"){
            console.log("url", `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`);
            //look in regional
            url = `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="${this.state.currentRegion}"`
        }else if (this.state.currentView === "a-z"){
            url = "https://bell-pokemon.firebaseio.com/allPokemon.json"
        }
            
        fetch(url)
        .then(res => res.json())
        .then(
           (result) => {
              console.log("result", result);
            //   //update state
            //   //react way - make a copy of state and then update the state
            //   const updatedPokemon = { ...this.state.pokemon };
            //   //make unique key with timestamp
            //    const timestamp = Date.now();
            //   result.showResult = false;
            //   result.calledAnother = false;
            // updatedPokemon[`poke-${timestamp}`] = result;
    
            //   //set state
            //   //using object will focus on the state that has changed
              this.setState({
                 pokeLoaded: true,
                 pokemon: result,
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
        )
     }


    componentDidMount() {
        //lifecycle hook
        console.log("componentDidMount");
        this.getPokemon();
     }

    

    changeView(event){
        console.log("event", event.target.id);
        this.setState({
          currentView: event.target.id
        });
    }

    changeRegion(event){
        console.log("show region:", event.target.id);
        this.setState({
            currentRegion: event.target.id,
            pokeLoaded: false,
            pokemon:{},
            error: null,
        }, this.getPokemon());
    }

    makeSearchObj(){
        console.log("makeObj", this.state.currentRegion);
        let searchObj = {
            currentView: this.state.currentView,
            currentRegion: this.state.currentRegion,
        }
        return searchObj;
    }

    // clickPokeName(whichOne){
    //     console.log(whichOne);
    //     let url = `https://bell-pokemon.firebaseio.com/allPokemon.json?orderBy="slug"&equalTo="${whichOne}"`;
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(result => {
    //           console.log("clickPokeName result", result);
    //           this.setState({
    //               currentPokemon: result
    //           })
    //           .catch(err => console.log("error with getting currentPokemon data"));
    //     })
    // }

    clickPokeName(whichOne){
        let url = `https://bell-pokemon.firebaseio.com/allPokemon.json?orderBy="slug"&equalTo="${whichOne}"`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            //need to get data out of key?
            let tmp = data;
            console.log("clickPokeName", tmp, data.FullImageURL);
            this.setState({ currentPokemon: data });
        })
        .catch(err => console.log(err));
    }

    render(){
        console.log("calling render, here now, however new data is not...");
        const { currentView, currentRegion, pokemon, pokeLoaded, currentPokemon} = this.state;
            return (
                <div>
                    <Navigation 
                        currentView={currentView} 
                        changeView={this.changeView} 
                        currentRegion={currentRegion} 
                        changeRegion={this.changeRegion} />
                    <ShowDetail currentPokemon={currentPokemon} />
                    {/*<ShowPokemon whichView={currentView} searchObj={searchObj}/>*/}
                    <ShowPokemon pokemon={pokemon}  clickPokeName={this.clickPokeName} />

                </div>
            );
    }
}

export default View;