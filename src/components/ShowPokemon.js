import React, { Component } from 'react';

class ShowPokemon extends Component {
    constructor(props) {
        super(props);

        this.renderPokemon = this.renderPokemon.bind(this);
        console.log("pokemon porps", this.props.pokemon);
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
        console.log("showpokemon componentDidMount");
        // this.getPokemon();

    }
    
     renderPokemon(key) {
        const poke = this.props.pokemon[key];
        return (
          <div className="poke-box" key={key}>
            <p onClick={() => this.props.clickPokeName(poke.pName)}>{poke.pName} </p>
          </div>
        )
      }
    
    render(){
        console.log("render loaded", this.props.pokemom);
            return (
                <div>
                {Object.keys(this.props.pokemon).map(this.renderPokemon)}
                </div>
            );
        
    }
    
}
export default ShowPokemon;