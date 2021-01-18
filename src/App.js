import React, {Component} from "react";
import BoxCollection from "./BoxCollection";
import Navbar from "./Navbar";
import "./App.css";


const CardStatus = {
  HIDDEN : 0,
  SHOWING: 1,
  MATCHING: 2
}


class App extends Component{
  constructor(props){
    super(props);
    const cards = this.knuthShuffle(this.props.cards);
    this.state = {cards, prevCard: {backgroundColor: "prev"}, lastCard: {backgroundColor: "last"}};
  }
  //Fisher-Yates shuffle
  knuthShuffle(arr){
    let curr = arr.length, temp, rand;
    while(0 !== curr){
      rand = Math.floor(Math.random() * curr);
      curr -= 1;
      temp = arr[curr];
      arr[curr] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  }
  newGame = () =>{
    const {HIDDEN} = CardStatus;
    const cards = this.knuthShuffle(this.props.cards);
    const newCards = cards.map(card=> card.status!==HIDDEN ? {...card, status: HIDDEN} : card);
    this.setState({cards: newCards, prevCard: {backgroundColor: "prev"}, lastCard: {backgroundColor: "last"}});
  }
  statusShow = (id) =>{
    const {HIDDEN, SHOWING, MATCHING} = CardStatus;
    const cards = this.state.cards.map(card=> (card.id===id&&card.status===HIDDEN) ? {...card, status: SHOWING} : card);
    let lastCard = this.state.cards.filter(card=> (card.id===id&&card.status===HIDDEN))[0];
    lastCard ? lastCard.status=SHOWING : lastCard = this.state.lastCard;
    this.setState((prevState)=> ({cards, prevCard: prevState.lastCard, lastCard}), ()=>{
      this.setState({cards, prevCard: this.state.prevCard, lastCard: this.state.lastCard});
      const {prevCard, lastCard} = this.state;
      const keys = [prevCard.id, lastCard.id];
      if((prevCard.backgroundColor===lastCard.backgroundColor) && (prevCard.id!==lastCard.id)){
        const {cards} = this.state;
        let newCards = cards.map(card=> (card.id===keys[0]||card.id===keys[1]) ? {...card, status: MATCHING} : card);
        prevCard.status = MATCHING;
        lastCard.status = MATCHING;
        this.setState({cards: newCards, prevCard, lastCard});
      }
      if((prevCard.status===SHOWING&&lastCard.status===SHOWING) && (prevCard.backgroundColor!==lastCard.backgroundColor)){
        setTimeout(()=>{
          const {cards} = this.state;
          let newCards = cards.map(card=> (card.id===keys[0] || card.id===keys[1]) ? {...card, status: HIDDEN} : card);
          prevCard.status = HIDDEN;
          lastCard.status = HIDDEN;
          this.setState({cards: newCards, prevCard: {backgroundColor: "prev"}, lastCard: {backgroundColor: "last"}});
        }, 300);
      }
    });
  }
  render(){
    const {cards} = this.state;
    return(
        <div className="App">
          <Navbar newGame={this.newGame} />
          <BoxCollection cards={cards} statusShow={this.statusShow} />
        </div>
    );
  }
}


App.defaultProps = {
  cards:[
    {id: 0, status: CardStatus.HIDDEN, backgroundColor: "crimson"},
    {id: 1, status: CardStatus.HIDDEN, backgroundColor: "crimson"},
    {id: 2, status: CardStatus.HIDDEN, backgroundColor: "burlywood"},
    {id: 3, status: CardStatus.HIDDEN, backgroundColor: "burlywood"},
    {id: 4, status: CardStatus.HIDDEN, backgroundColor: "pink"},
    {id: 5, status: CardStatus.HIDDEN, backgroundColor: "pink"},
    {id: 6, status: CardStatus.HIDDEN, backgroundColor: "aquamarine"},
    {id: 7, status: CardStatus.HIDDEN, backgroundColor: "aquamarine"},
    {id: 8, status: CardStatus.HIDDEN, backgroundColor: "darkorange"},
    {id: 9, status: CardStatus.HIDDEN, backgroundColor: "darkorange"},
    {id: 10, status: CardStatus.HIDDEN, backgroundColor: "dodgerblue"},
    {id: 11, status: CardStatus.HIDDEN, backgroundColor: "dodgerblue"},
    {id: 12, status: CardStatus.HIDDEN, backgroundColor: "goldenrod"},
    {id: 13, status: CardStatus.HIDDEN, backgroundColor: "goldenrod"},
    {id: 14, status: CardStatus.HIDDEN, backgroundColor: "indigo"},
    {id: 15, status: CardStatus.HIDDEN, backgroundColor: "indigo"}
  ]
}


export default App;
