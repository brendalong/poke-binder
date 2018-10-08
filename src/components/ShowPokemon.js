import React, { Component } from 'react';
import './ShowPokemon.css';
import {firstLetterCase} from '../helpers';


class ShowPokemon extends Component {
   state = {
            activeElement: null,
   }

   componentDidMount() {
      this.setState({
         activeElement: null,
      });
   }

   handleClick = (e, id) => {
      if (this.state.activeElement){
         this.state.activeElement.classList.remove("activePokemon");
       }

      this.setState({
         activeElement: e.target,
      });

      e.target.classList.add("activePokemon");
      this.props.clickPokeName(id);
   }

    // when clicked, turn bkg another color for active one.
    renderPokemon = (key) => {
        const poke = this.props.pokemon[key];
        if (this.props.currentView === "regions"){
            return (
                <div className="poke-box" key={key}>
                  <button type="button" id={poke.pName} className="btn btn-link"
                     onClick={(event)=>this.handleClick(event, poke.pName)}>
                     {firstLetterCase(poke.pName)}
                  </button>
               </div>
            )
        }else if (this.props.currentView === "a-z"){
            return(
                <div className="poke-box" key={key}>
                  <button type="button" className="btn btn-link"
                     onClick={(event) => this.handleClick(event, poke.slug)}>
                  {firstLetterCase(poke.slug)}
                  </button>
                </div>
            )
         }else if (this.props.currentView === "mine") {
           return (
              <div className="poke-box" key={key}>
                 <button type="button" class="btn btn-link"
                    onClick={(event) => this.handleClick(event, poke.slug)}>
                    {firstLetterCase(poke.pName)}
                 </button>
              </div>
            )
         }
      }

    render(){
         return (
            <React.Fragment>
               {Object.keys(this.props.pokemon).map(this.renderPokemon)}
            </React.Fragment>
         );
    }
}
export default ShowPokemon;