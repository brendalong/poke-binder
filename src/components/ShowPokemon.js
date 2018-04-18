import React, { Component } from 'react';
import './ShowPokemon.css';
import {firstLetterCase} from '../helpers';

class ShowPokemon extends Component {
    constructor(props) {
        super(props);

        this.renderPokemon = this.renderPokemon.bind(this);

        // let searchObj = props.searchObj;
        // this.state = {
        //     pokemon: searchObj.pokemon,
        //     pokeLoaded: searchObj.pokeLoaded,
        //     error: null,
        //     currentRegion: searchObj.currentRegion
        // }

        this.state ={
            activeElement: null,
        }
    }

    componentDidMount() {
        //lifecycle hook
        //console.log("showpokemon componentDidMount");
        this.setState({
            activeElement: null,
        });
    }

    // when clicked, turn bkg another color for active one.
    renderPokemon(key) {
        const poke = this.props.pokemon[key];
        if (this.props.currentView === "regions"){
        return (
          <div className="poke-box" key={key}>
            <p onClick={((e) => {
                {(this.state.activeElement) ?
                    this.state.activeElement.classList.remove("activePokemon")
                    : null }
                this.setState({
                    activeElement: e.target,
                })
                e.target.classList.add("activePokemon");
                this.props.clickPokeName(poke.pName)})
                }>{firstLetterCase(poke.pName)}</p>
          </div>
        )
        }else if (this.props.currentView === "a-z"){
            return(
            <div className="poke-box" key={key}>
            <p onClick={((e) => {
                {(this.state.activeElement) ?
                    this.state.activeElement.classList.remove("activePokemon")
                    : null }
                this.setState({
                    activeElement: e.target,
                })
                e.target.classList.add("activePokemon");
                this.props.clickPokeName(poke.slug)})
                }>{poke.name}</p>
            </div>
            )
         }else if (this.props.currentView === "mine") {
           return (
              <div className="poke-box" key={key}>
                 <p onClick={((e) => {
                    {(this.state.activeElement) ?
                       this.state.activeElement.classList.remove("activePokemon")
                       : null
                    }
                    this.setState({
                       activeElement: e.target,
                    })
                    e.target.classList.add("activePokemon");
                    this.props.clickPokeName(poke.currentPokemon)
                 })
                 }>{firstLetterCase(poke.currentPokemon)}</p>
              </div>
            )
         }
      }

    render(){
       console.log("pokemon props", this.props.pokemon.length);

         return (
            <div>
               {Object.keys(this.props.pokemon).map(this.renderPokemon)}
            </div>
         );
    }
}
export default ShowPokemon;