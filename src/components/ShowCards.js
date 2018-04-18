import React, { Component } from 'react';


class ShowCards extends Component {
    constructor(props) {
        super(props);
        this.renderCards = this.renderCards.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.compareMyCards = this.compareMyCards.bind(this);
        this.objMap = this.objMap.bind(this);


    }

    handleChange(e, key) {
        //do we add the card or update
        // oneOfMine === true

        if(this.props.cards[key].oneOfMine !== true){
            const newCard = {
                ...this.props.cards[key],
                [e.target.name]: e.target.value,
                oneOfMine: true,
            }
            this.props.addCard(newCard);
        }else{
           //need key of myCard
           const myCard = this.props.myCards[this.props.cards[key].mycardid];
           // take a copy of that card and update it with the new data
            const updatedCard = {
            ...this.props.myCard,
            [e.target.name]: e.target.value,

            }
           this.props.updateMyCards(this.props.cards[key].mycardid, updatedCard);
        }
      }

      objMap(key){
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

   // componentWillMount(){
   //    this.compareMyCards();
   // }
    componentDidMount() {
        //lifecycle hook

        // this.compareMyCards();
        //cycle through mine and this.props.cards and find matches, tag this.props.cards with property of oneOfMine
    }

     renderCards(key) {
        const card = this.props.cards[key];
        //console.log("render cards", key, card.imageUrl);
        // card.status = 'wild';
      //   console.log("card status", this.props.cards[key], card.status);

        if (!card.status){
            card.status = 'wild';
        }

        return (
           <div className="row" key={key} mycardid={card.mycardid}>
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
                        <textarea rows='1' type="text"  value={card.notes || ""} name="notes" placeholder='notes' onChange={(e) => this.handleChange(e, key)}/>
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