import React, {Component} from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import "./BoxCollection.css";


class BoxCollection extends Component{
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    statusShow: PropTypes.func.isRequired,
  }
  render(){
    const {statusShow} = this.props;
    const boxes = this.props.cards.map(card=> <Box key={card.id} {...card} statusShow={statusShow} />);
    return(
      <main>
          {boxes}
      </main>
    );
  }
}


export default BoxCollection;
