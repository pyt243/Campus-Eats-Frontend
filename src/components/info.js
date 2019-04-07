import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css";
import "./info.css";

class OInfo extends Component{
  state={
    user:this.props.location.state.user,
    outlet:this.props.location.state.outlet,
    loadStatus:true
  }
  componentWillMount(){
    console.log(this.state.outlet);
  }
  render(){
    this.postReview = this.postReview.bind(this);
    var outlet=this.state.outlet;
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
      <div className="outlet-box">
      <div className="back-image">
        <h1 className="outlet-title">OUTLET REVIEW</h1>
      </div>
          <div className="outlet-inner">
          <div className="outlet-inner2">
          <h2 className="info-outlet-name">{this.state.outlet.name}</h2>
          <img src={"https://infinite-lake-20082.herokuapp.com/"+this.state.outlet.image} className="outlet-image" />
          <div className="outlet-info">
            <div className="fi-1"><b>Location:</b></div>
            <div classname="fi-2">{this.state.outlet.location}</div>
          </div>
          <div className="outlet-info">
            <div className="fi-1"><b>Username:</b></div>
            <div classname="fi-2">{this.state.outlet.owner.username}</div>
          </div>
          <div className="outlet-info">
            <div className="fi-1"><b>Mobile No:</b></div>
            <div classname="fi-2">{this.state.outlet.owner.mobno}</div>
          </div>
          <div className="outlet-info des">
            <div className="fi-1 oid"><b>Description:</b></div>
            <div classname="fi-2" id="outlet-information">{this.state.outlet.description}</div>
          </div>
          <div className="outlet-info">
            <div className="fi-1"><b>Rating:</b></div>
            <div classname="fi-2">4.5</div>
          </div>
          <div className="comments">
           <div className="comment-div"><b>Review:</b></div>
           <textarea type="text" id="comment" placeholder="Post Your Valuable Comments Here" ref="review"></textarea>
          </div>
          <button type="submit" id="submit-comment" onClick={this.postReview}>Submit</button>
          </div>
          </div>
      </div>
      </div>

    );
  }
  postReview(e){
    axios.post("https://infinite-lake-20082.herokuapp.com/postreview",{user:this.state.user,outlet:this.state.outlet,content:this.refs.review.value}).then(res=>{
      if(res.data.status==true);
        alert("Thank you for yor valuable feedback!");
    });
  }
}
export default OInfo;
