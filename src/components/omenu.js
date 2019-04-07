import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"

class OMenu extends Component{
  state={
    user:this.props.data.user,
    outlets:this.props.data.outlets,
    d:this.props.data.d,
    loadStatus:false
  }
  componentDidMount(){
     console.log(this.state.outlet)
  }
  render(){
    this.addToCart = this.addToCart.bind(this);
       var num=this.props.data.d;
       var outlet=this.state.outlets[num];
       var items = outlet.menu;
       items=items.map(function(item,index){
         return(
           <div className="om-item-div">
                <div className="omi-left">
                  <div className="om-itemname">{item.name}</div>
                  <div className="om-category">{"Category: "+item.category}</div>
                </div>
                <div className="omi-mid">
                  <div className="om-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
                  <div className="om-price">{item.price+"/-"}</div>
                </div>
                <div className="omi-right">
                  <div className="col-r"></div>
                  <button className="om-addcart" id={"o-item"+index} onClick={this.addToCart}>Add to cart</button>
                </div>
           </div>
         )
       }.bind(this))
       return(
         <div className="menu-div">
         <div className="menu-title-div">
             <h2 className="omenu-title">{"MENU : "+outlet.name}</h2>
             <hr className="menu-title-hor"></hr>
         </div>
             <div class="om-inner">{items}</div>
         </div>
       )
  }
  addToCart(e){
    var d = this.props.data.d;
    var item = this.state.outlets[d].menu[e.target.id[6]];
    axios.post("https://infinite-lake-20082.herokuapp.com/addtocart",{user:this.state.user,item:item}).then(res => {
      console.log(res.data.cart);
      if(res.data.status==false)
        alert(res.data.message);
      else {
         alert("Item added to cart successfully!");
      }
    })
  }
}
export default OMenu
