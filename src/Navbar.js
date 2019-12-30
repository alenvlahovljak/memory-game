import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

class Navbar extends Component{
  static propTypes = {
    newGame: PropTypes.func
  }
  static defaultProps = {
    newGame(){}
  }
  render(){
    const {newGame} = this.props;
    return(
      <header>
        <h2>Memory Game</h2>
        <ul>
          <li onClick={newGame}>New Game</li>
        </ul>
      </header>
    );
  }
}

export default Navbar;