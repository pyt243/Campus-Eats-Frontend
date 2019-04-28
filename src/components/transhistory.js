import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"

class TransHistory extends Component{
  state={
    user:this.props.location.state.user,
    orders:[{student:{username:"no one"},items:[],quantity:[],outlet:{}}],
    loadStatus:false
  }
  componentWillMount(){
      axios.post("stuhistory",{user:this.state.user}).then(res =>{
        this.setState({orders:res.data.orders});
        console.log(this.state.orders);
      });
  }
  render(){
    return(
      <div className="cover">
        <Navbar user={this.state.user} />
      </div>
    );
  }
}
export default TransHistory;
