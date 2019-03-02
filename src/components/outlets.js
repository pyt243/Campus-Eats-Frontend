import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./outlets.css"

class Outlets extends Component{
  state={
    user:this.props.location.state.user,
    outlets:[{owner:{}}],
  }
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/outlets",{}).then(res=>{
      this.setState({outlets:res.data.outlets});
      console.log(this.state.outlets);
    });
  }
  render(){
    var outlets=this.state.outlets;
    outlets=outlets.map(function(outlet,index){
      return(
        <div className="eachoutlet">
            <div className="eachoutlet-left">
              <img src={" https://infinite-lake-20082.herokuapp.com/"+outlet.image} className="eachoutlet-image" />
            </div>
            <div className="eachoutlet-right">
              <div className="eachoutlet-name">Name:<b>{outlet.name}</b></div>
              <div className="eachoutlet-location">{"Location:  "+outlet.location}</div>
              <div className="eachoutlet-email">{"Email:  "+outlet.user}</div>
              <div className="eachoutlet-mobno">{"Phone No:  "+outlet.owner.mobno}</div>
            </div>
            <hr className="eachoutlet-rule"/>
        </div>
      )
    })
    return(
      <div className="cover">
      <Navbar user={this.state.user} />
      <div className="outlets-div">
      <div className="outlets-main">
      <h1 className="outlets-title">Outlets page</h1>
      <div className="outlets-inner">{outlets}</div>
      </div>
      </div>
      </div>
    );
  }
}
export default Outlets;
