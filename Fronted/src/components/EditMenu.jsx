import React, { Component } from "react";
import Menu from "./menu/menuComponent";

export default class EditMenu extends Component {
  
  newItem = {      
    itemName:'',
    category:'',
    itemType:'Veg',
    price:0,
    onlineprice:0
};

  constructor(props) {
    super(props)  
    this.state = {
       editItem : this.newItem
    }

    this.MenuRef = React.createRef()
  }
  
  btnClick = (m) => {
    let editItem = { ...m };

    this.setState({ editItem });
  };

  handleInputChange = (e) => {
    let editItem = { ...this.state.editItem };
    editItem[e.target.name] = e.target.value;    
    
    this.setState({ editItem })
  }

  handleSubmit = async (e) => {    
      e.preventDefault(); 
      
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.editItem),
      };

      

      if (this.state.editItem._id) {
        options.method = "PUT";
      } else {
        options.method = "POST";
      }      
      
      await fetch("http://localhost:3005/api/menu", options)
      .then((response) => response.json())
      .then((data) => {
        
        this.setState({ editItem: data.data }, () => {          
           this.MenuRef.current.itemUpdate(data.data, options.method)
        });
      });


     
  }

  clickItemType = () => {
    let editItem = { ...this.state.editItem };
    
    if(editItem.itemType === "Veg") {
      editItem.itemType = "Non-Veg"
    }      
    else {
      editItem.itemType = "Veg"
    }    

    this.setState({ editItem })   
  }


  render() {
    const {editItem} = this.state
    return (
      <div className="row container-fluid">
        <div className="col-8">
          <Menu title="Edit Menu" btnClick={this.btnClick} className="col-8"  ref={this.MenuRef}/>
        </div>
        {/* Edit item */}
        <div className="col-4 editMenu">
            
          <section className="pt-4" >
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" name="itemName" value={editItem?.itemName} onChange={this.handleInputChange} />
            </div>
            <div className="form-group row">
              <label htmlFor="" className="col-4 col-form-label" >Category</label>
              <div className="col-8">
                <input type="text" className="form-control" name="category" onChange={this.handleInputChange}  value={editItem?.category} />
              </div>

            </div>
            <div className="form-group row">
              <label htmlFor="" className="col-4 col-form-label" >Type</label>
              <div className="col-8" >
                <div className= {"btn text-left border border-light " +  editItem?.itemType} onClick={this.clickItemType} >
                  <span className="fa-stack fa-sm">
                    <i className="fa fa-square-o fa-stack-2x"></i>
                    <i className="fa fa-circle fa-stack-1x"></i>
                  </span>
                  <span className="ml-2">{editItem?.itemType}  </span>  
                </div>
                
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="" className="col-4 col-form-label" >Price</label>
              <div className="col-8 input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"> &#8377; </div>
                </div>
                <input type="number" className="form-control" name="price" onChange={this.handleInputChange}  value={editItem?.price} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="" className="col-4 col-form-label" > Online Price</label>
              <div className="col-8 input-group">

                <div className="input-group-prepend">
                  <div className="input-group-text"> &#8377; </div>
                </div>
                <input type="number" className="form-control" name="onlineprice" onChange={this.handleInputChange}  value={editItem?.onlineprice} />
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-6">
                  <button  className="btn btn-success" onClick={this.handleSubmit} >Save</button> 
                </div>
                <div className="col-6">
                <button className="btn btn-warning" onClick={()=>{this.setState({editItem:this.newItem})}}>Add New item</button>
                </div>
              </div>
              
            </div>
          </section>
        </div>

      </div>
    
    );
  }

  
}
