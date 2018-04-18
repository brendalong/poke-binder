import React, { Component } from 'react';


class ShowCards extends Component {
    constructor(props) {
        super(props);
        console.log("card props", this.props.cards);
        this.renderCards = this.renderCards.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.compareMyCards = this.compareMyCards.bind(this);
        this.objMap = this.objMap.bind(this);
       
       
    }

    handleChange(e, key) {
        //do we add the card or update
        // oneOfMine === true
        console.log("my cards", this.props.myCards);
        console.log(e, key);
        if(this.props.cards[key].oneOfMine !== true){
            const newCard = {
                ...this.props.cards[key],
                [e.target.name]: e.target.value,
                oneOfMine: true,
            }
            this.props.addCard(newCard);
        }else{
            const myCard = this.props.cards[key];
            // take a copy of that card and update it with the new data
            //look at my cards
            const updatedCard = {
            ...this.props.myCards,
            [e.target.name]: e.target.value,
            
            }
            this.props.updateMyCards(key, updatedCard);
        }
      }

      objMap(key){
        this.props.cards.forEach((element) => {
            if (this.props.myCards[key].id === element.id){
                element.oneOfMine = this.props.myCards[key].oneOfMine;
                element.notes = this.props.myCards[key].notes || null;
                element.status = this.props.myCards[key].status || "caught";
                console.log("got one", element);
            }
        });
      }

      compareMyCards(){
        Object.keys(this.props.myCards).map((this.objMap))
      }


    componentDidMount() {
        //lifecycle hook
        console.log("showCards componentDidMount");
        console.log("my cards", this.props.myCards);
        console.log("the cards", this.props.cards);
        // this.compareMyCards();
        //cycle through mine and this.props.cards and find matches, tag this.props.cards with property of oneOfMine
    }

     renderCards(key) {
        const card = this.props.cards[key];
        //console.log("render cards", key, card.imageUrl);
        // card.status = 'wild';
        console.log("card status", this.props.cards[key], card.status);
        
        if (!card.status){
            card.status = 'wild';
        }
       
        
        return (
            <div className="row" key={key}>
            <div className="card mb-4 box-shadow bg-light border-info" >
                <img className='card-img-top' src={card.imageUrl} alt={card.name} onClick={(e) => {this.props.clickCard(card)}}/>
                {/*imageUrlHiRes */}
                <div className="card-body">
                {/*onClick={this._onOptionChange.bind(this, 'optionA')} active={this.state.option === 'optionA'}*/}
                    <select type="text" name="status" value={card.status} placeholder="Card Status" onChange={(e) => this.handleChange(e, key)}>
                        <option value="caught">Caught!</option>
                        <option value="want">Want</option>
                        <option value="wild">Wild</option>
                    </select>

                    {card.oneOfMine ? 
                    <div>
                        <textarea rows='1' type="text" className="form-control" name="notes" placeholder='notes' onChange={(e) => this.handleChange(e, key)}/>
                    </div>
                    : null}
                </div>
            </div>
            </div>
        )
      }


      

    render(){
        this.compareMyCards();
         return (
            <div>
               {Object.keys(this.props.cards).map(this.renderCards)}
            </div>
         );
      }
}
export default ShowCards;