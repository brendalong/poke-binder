import React, { Component } from 'react';
import RenderCard from './RenderCard';


class ShowCards extends Component {
    state = {
        
    }

    // handleChange = (e, key) => {
    //     //do we add the card or update
    //     if(this.props.cards[key].oneOfMine !== true){
    //         const newCard = {
    //             ...this.props.cards[key],
    //             [e.target.name]: e.target.value,
    //             oneOfMine: true,
    //             currentPokemon: this.props.currentPokemon.slug
    //         }
    //         // console.log("new card", newCard);
    //         this.props.addCard(newCard);
    //     }else{
    //     //    const myCard = this.props.myCards[this.props.cards[key].mycardid];
    //     //    // take a copy of that card and update it with the new data
    //     //     const updatedCard = {
    //     //     ...this.props.myCard,
    //     //     [e.target.name]: e.target.value,
    //     //     }
    //     //    this.props.updateMyCards(this.props.cards[key].mycardid, updatedCard);

    //         const myCard = this.props.myCards[this.props.cards[key].mycardid];
    //         if (e.target.name === "status"){
    //            //go ahead and update 
    //            const updatedCard = {
    //             ...this.props.myCard,
    //             [e.target.name]: e.target.value,
    //            }
    //            this.setState({updatedCard});
    //         //    this.props.updateMyCards(this.props.cards[key].mycardid, updatedCard);
    //         }else{
    //            //make change to notes - get from state
    //            const updatedCard = {
    //                ...this.props.myCard,
    //                [e.target.name]: e.target.value,
    //            }
    //            this.setState({updatedCard});
    //         //    this.props.updateMyCards(this.props.cards[key].mycardid, updatedCard);
    //         }
    //         if(e.target.name === "saveNote"){
    //             this.props.updateMyCards(this.props.cards[key].mycardid, this.state.updatedCard);
    //         }

    //     //    flow
    //     //    dropdown change, keep if statement and addCard
    //     //    textbox change, on changes, setState to value
    //     //    touch Save: make updateCard based on values in state
            
    //     }
    //   }

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

    compareMyCards(){
        Object.keys(this.props.myCards).map((this.objMap))
    }

    componentDidMount() {
       
    }

    renderCards = (key) => {
        const card = this.props.cards[key];

        if (!card.status){
            card.status = 'wild';
        }

        return (
            <div className="row" key={key} mycardid={card.mycardid}>
            <div className="card mb-4 box-shadow bg-light border-info" >
                <img className='card-img-top' src={card.imageUrl} alt={card.name} onClick={(e) => {this.props.clickCard(card)}}/>
                <div className="card-body">
                    <select type="text" name="status" value={card.status} placeholder="Card Status" onChange={(e) => this.handleChange(e, key)}>
                        <option value="caught">Caught!</option>
                        <option value="want">Want</option>
                        <option value="wild">Wild</option>
                    </select>

                    {card.oneOfMine ?
                    <div>
                    <textarea rows='1' type="text"  value={card.notes || ""} name="notes" placeholder='notes' onChange={(e) => this.handleChange(e, key)}/>
                    <button id="save" onClick={this.saveNote}>Save</button>
                    </div>
                    : <div></div>}
                </div>
            </div>
            </div>
        )
    }
//{Object.keys(this.props.cards).map(this.renderCards)}
    saveNote = () => {
        console.log("save Note", )
    }

    render(){
        this.compareMyCards();
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
                    updateMyCards={this.props.updateMyCards} />
                })
                }
            </div>
         );
      }
}
export default ShowCards;