import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Box.css";


const ColoredBox = (props) =>{
  const {id, status, backgroundColor, statusShow} = props;
  let bc = "";
  (status===1||status===2) ? bc=backgroundColor : bc="#2c3e50"; 
  return (<div className="box" style={{backgroundColor: bc}} onClick={()=> statusShow(id)}></div>);
}


class Box extends Component{
  static propTypes = {
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    statusShow: PropTypes.func.isRequired,
  } 
  static defaultProps = {
    statusShow(){},
  }
  render(){
    const box = this.props;
    return(
      <ColoredBox key={box.id} {...box} />
    );
  }
}


export default Box;