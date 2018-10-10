import React, { Component } from 'react';


class RenderCard extends Component {
    state = {
        card: {},
    }

    handleChange = (e, key) => {
        console.log("handle change", e, key);
        //do we add the card or update
        if(this.state.card.oneOfMine !== true){
            const newCard = {
                ...this.state.card,
                [e.target.name]: e.target.value,
                oneOfMine: true,
                currentPokemon: this.props.currentPokemon,
            }
            this.props.addCard(newCard);
        }else{
            if (e.target.name === "status"){
                //go ahead and update 
                const updatedCard = {
                ...this.state.card,
                [e.target.name]: e.target.value,
                }
                this.setState({card:updatedCard});
                this.props.updateMyCards(this.state.card.mycardid, updatedCard);
            }else{
               //make change to notes - get from state
               console.log("make change to note")
               const updatedCard = {
                   ...this.state.card,
                   [e.target.name]: e.target.value,
               }
               this.setState({card: updatedCard});
            }
        // flow
        // dropdown change, keep if statement and addCard
        // textbox change, on changes, setState to value
        // touch Save: make updateCard based on values in state
            
        }
      }

      saveNote = () => {
        this.props.updateMyCards(this.state.card.mycardid, this.state.card);
      }

      componentDidMount(){
        const card = {...this.props.card}
        this.setState({card})
      }


    render(){
        const card = this.state.card;
        const item = this.props.item;
    
        return (
            <div className="row" mycardid={card.mycardid}>
            <div className="card mb-4 box-shadow bg-light border-info" >
                <img className='card-img-top' src={this.state.card.imageUrl} alt={this.state.card.name} onClick={(e) => {this.props.clickCard(card)}}/>
                <div className="card-body">
                    <select type="text" name="status" value={this.state.card.status || "wild"} placeholder="Card Status" onChange={(e) => this.handleChange(e, item)}>
                        <option value="caught">Caught!</option>
                        <option value="want">Want</option>
                        <option value="wild">Wild</option>
                    </select>

                    {this.state.card.oneOfMine ?
                    <div>
                    <textarea rows='1' type="text"  value={this.state.card.notes || ""} name="notes" placeholder='notes' onChange={(e) => this.handleChange(e, item)}/>
                    <button id="save" onClick={this.saveNote}>Save</button>
                    </div>
                    : <div></div>}
                </div>
            </div>
            </div>
        )
    }
}
export default RenderCard;