import React, { Component } from "react";
import Table from "../table/table";

class MenuTable extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      columns : [
        { field: "itemName", label: "Item", show:true },
        {
          field: "itemType",
          label: "#",
          content: (m) => (
            <div className={m.itemType}>
              <span className="fa-stack fa-sm">
                <i className="fa fa-square-o fa-stack-2x"></i>
                <i className="fa fa-circle fa-stack-1x"></i>
              </span>
            </div>
          ),
          show:true
        },
        { field: "price", label: "Price", show: this.onLinePrice(!this.props.onLinePrice)},
        { field: "onlineprice", label: "OPrice",show: this.onLinePrice(this.props.onLinePrice) },
        {
          field: "add",
          label: "",
          content: (m) => (
            <button
              className="btn  btn-sm btn-success"
              onClick={() => this.props.btnClick(m)}
            >
              <i className={this.getbtn()} aria-hidden="true"></i>
            </button>
          ),
          show:true
        },
      ]
    }
  }

  getbtn() {
    let classbtn =
      this.props.btnOpt === "Edit Menu" ? "fa fa-pencil" : "fa fa-plus";

    return classbtn;
  }

  onLinePrice = (show = true) => {
    if(this.props.btnOpt === "Edit Menu") return true  

     if(this.state){
       let columns = [...this.state.columns]
       let price = columns.find(item => item.field=== "price");
       let onlineprice = columns.find(item => item.field=== "onlineprice");
       price.show = !show
       onlineprice.show = show
       this.setState({columns})      
     }
    
  

    return show

    // let columns = [...this.state.columns]

     
  }

  



  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.state.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MenuTable;
