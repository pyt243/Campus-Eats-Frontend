import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./mymenu.css"

class MyMenu extends Component{
  state={
    user:this.props.location.state.user,
    outlet:{owner:{username:"no one"},menu:[]},
    nov:"veg"
  }
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/myoutlet",{user:this.state.user.username}).then(res=>{
      this.setState({outlet:res.data.outlet});
      console.log("hi");
      console.log(this.state.outlet);
    });
  }
  render(){
    var items=this.state.outlet.menu;
    items = items.map(function(item, index){
        return(
          <div className={item.category+" menuitem"}>
          <div className="menuitem-left">
              <div className="menuitem-name">Name:<b>{item.name}</b></div>
              <div className="menuitem-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
              <div className="menuitem-category">{"Category:"+item.category}</div>
              <div className="item-price"><b>{item.price+"/-"}</b></div>
            </div>
            <div className="menuitem-right">
              <button className="menuitem-button">Edit</button>
            </div>
          </div>
        );
    }.bind(this));
    this.addMenuItem=this.addMenuItem.bind(this);
    this.radioChange = this.radioChange.bind(this);
    return (
      <div className="cover">
            <Navbar user={this.state.user} />

            <div className="mymenu-div">
            <h1 className="mymenu-title">{this.state.outlet.name+"-MENU"}</h1>
            <div className="menu-div">
                <h2 className="menu-title">MENU</h2>
                <div class="menu-inner">{items}</div>
            </div>
            <div className="mymenu-form">
            <div className="mymenu-form-inner">
            <h2 className="addmenu-title">Add Menu Item</h2>
            <form onSubmit={this.addMenuItem}>
                <div className="mymenu-form-name">
                    <input type="text" className="mymenu-input" placeholder="Enter the name of the menu item" ref="name"/>
                </div>
                <div className="mymenu-form-category">
                    <input type="text" className="mymenu-input" placeholder="Enter the category" ref="category"/>
                </div>
                <div className="mymenu-form-price">
                    <input type="text" className="mymenu-input" placeholder="Enter the price" ref="price"/>
                </div>
                <div className="veg-radio">
                  <label>Veg  :  <input type="radio" name="nov" value="veg" onChange={this.radioChange} /></label>
                </div>
                <div className="nonveg-radio">
                  <label>Non-Veg  :  <input type="radio" name="nov" value="nonveg" onChange={this.radioChange}/></label>
                </div>
                <input type="submit" className="addmenu-submit" />
            </form>
            </div>
            </div>
            </div>
      </div>

    );
  }
  radioChange(e){

    this.setState({nov:e.target.value});

  }
  addMenuItem(e){
    e.preventDefault();
    var name= this.refs.name.value;
    var category=this.refs.category.value;
    var price = Number(this.refs.price.value);
    var nov = this.state.nov
    console.log(price);
    console.log(typeof(price));
    if(isNaN(price)){
      alert("Enter a valid price amount");
      return;
    }
    axios.post("http://localhost:3050/addmenu",{
      name:name,
      outlet:this.state.outlet,
      category:category,
      price:price,
      nov:nov
    }).then(res=>{
      axios.post("http://localhost:3050/myoutlet",{user:this.state.user.username}).then(res=>{
        this.setState({outlet:res.data.outlet});
        console.log(this.state.outlet);
      });
    });
    console.log(this.state.nov);
  }
}
export default MyMenu;
