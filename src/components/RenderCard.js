import React, { Component } from 'react';
import LoginModal from './LoginModal';
import {Card, CardImg, CardText, CardBody,
   CardTitle, CardSubtitle} from 'reactstrap';

class RenderCard extends Component {
    state = {
        card: {},
        savenow: false,
    }

    handleChange = (e, key) => {
        //do we add the card or update
        if(this.state.card.oneOfMine !== true){
            const newCard = {
                ...this.state.card,
                [e.target.name]: e.target.value,
                oneOfMine: true,
                currentPokemon: this.props.currentPokemon,
            }
            this.setState({card:newCard});
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
               const updatedCard = {
                   ...this.state.card,
                   [e.target.name]: e.target.value,
               }

               this.setState({card: updatedCard, savenow:true});
            }
        // flow
        // dropdown change, keep if statement and addCard
        // textbox change, on changes, setState to value
        // touch Save: make updateCard based on values in state

        }
      }

      saveNote = () => {
        this.props.updateMyCards(this.state.card.mycardid, this.state.card);
        this.setState({savenow: false});
      }

      componentDidMount(){
        const card = {...this.props.card}
        this.setState({card})
      }

   componentDidUpdate(prevProps, prevState, snapshot){
      if (prevProps.auth !== this.props.auth){
         this.setState({card: this.props.card})
      }
   }


    render(){
        const card = this.state.card;
        const item = this.props.item;

        return (

            <Card className="mb-4 box-shadow bg-light border-info" mycardid={card.mycardid}>
               <CardImg top width="55%" src={this.state.card.imageUrl} alt={this.state.card.name} onClick={(e) => {this.props.clickCard(card)}}/>
                {this.props.auth ?
                <CardBody>
                    <select style={{ width: '100%' }} type="text" name="status" value={this.state.card.status || "wild"} placeholder="Card Status" onChange={(e) => this.handleChange(e, item)}>
                        <option value="caught">Caught</option>
                        <option value="want">Want</option>
                        <option value="wild">Wild</option>
                    </select>

                    {this.state.card.oneOfMine ?
                    <div>
                          <textarea style={{ width:'100%' }} rows='2' type="text"  value={this.state.card.notes || ""} name="notes" placeholder='notes' onChange={(e) => this.handleChange(e, item)}/>
                          <button style={{ width: '100%' }} id="save" onClick={this.saveNote} disabled={this.state.savenow ? false : true}>Save Note</button>
                    </div>
                    : <div></div>}
                 </CardBody>
                 : <div><LoginModal style={{ width: '100%' }} buttonLabel="Login" loginWithGoogle={this.props.loginWithGoogle} /> to save cards to your binder</div>}
            </Card>

        )
    }
}
export default RenderCard;