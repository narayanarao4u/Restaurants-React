import React, { Component } from "react";
import style from "./basket.module.css";

class Basket extends Component {
  getBabgeClasses() {
    let classes = `${style.qty}  `;
    classes += this.props.obj.qty === 0 ? "bg-warning" : "";
    return classes;
  }

  render() {
    // this.state.qty++;
    // console.log("props::", this.props);
    const { item, qty, price, amt } = this.props.obj;

    return (
      <tr>
        <td>{item.itemName} </td>
        <td className={style.amt}> {price}</td>
        <td className="text-center text-nowrap">
          <span
            className={style.mybtn}
            onClick={() => this.props.onChangeEvent(this.props.obj, -1)}
            disabled={this.props.obj.qty === 0}
          >
            <i className="fa fa-minus-circle" aria-hidden="true"></i>
          </span>
          <span className={this.getBabgeClasses()}>{qty}</span>
          <span
            className={style.mybtn}
            onClick={() => this.props.onChangeEvent(this.props.obj, +1)}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </span>
        </td>

        <td className={style.amt}> {amt}</td>

        {/* <button
            className="btn btn-danger btn-sm pl-2"
            onClick={() => this.props.onDelete(this.props.obj.id)}
          >
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button> */}
      </tr>
    );
  }
}

export default Basket;
