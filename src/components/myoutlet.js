import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./myoutlet.css"

class MyOutlet extends Component{
  state={
    user:this.props.location.state.user,
    outlet:{owner:{username:"no one"},menu:[]},
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/myoutlet",{user:this.state.user.username}).then(res=>{
      this.setState({outlet:res.data.outlet,loadStatus:true});
      console.log("hi");
      console.log(this.state.outlet);
    });
  }
  render(){
    this.clicked=this.clicked.bind(this);
    if(this.state.loadStatus==false){
      return(
        <div className="cover">
          <Navbar user={this.state.user} />
        <div className="load-div">
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
        </div>
        </div>
      )
    }
    return(
      <div className="cover">
      <Navbar user={this.state.user} />
      <div className="myoutlet-box">
      <h1 className="myoutlet-title">MY OUTLET</h1>
          <div className="myoutlet-inner">
          <div className="myoutlet-inner2">
          <h2 className="myoutlet-name">{this.state.outlet.name}</h2>
          <img src={"/"+this.state.outlet.image} className="myoutlet-image" />
          <div className="myoutlet-info">
            <div className="mfi-1">Location:</div>
            <div classname="mfi-2">{this.state.outlet.location}</div>
          </div>
          <div className="myoutlet-info">
            <div className="mfi-1">Username:</div>
            <div classname="mfi-2">{this.state.outlet.owner.username}</div>
          </div>
          <div className="myoutlet-info">
            <div className="mfi-1">Mobile No:</div>
            <div classname="mfi-2">{this.state.outlet.owner.mobno}</div>
          </div>
          <div className="myoutlet-info des">
            <div className="mfi-1">Description:</div>
            <div classname="mfi-2" id="outlet-info">{this.state.outlet.description}</div>
          </div>
          <div className="myoutlet-info">
            <div className="mfi-1">Rating:</div>
            <div classname="mfi-2">4.5</div>
          </div>

          <Link to={{pathname:"/mymenu",state: { user:this.state.user}}}><button className="myoutlet-button">View Menu</button></Link>
          </div>
          </div>
      </div>
      </div>
    );
  }
  clicked(e){
    console.log(this.state.outlet.owner);
  }
}
export default MyOutlet;
