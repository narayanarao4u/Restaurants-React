import React, { Component, createRef } from "react";
import Basket from "./basketCompnent";
import Modal from "../common/Modal"

import style from "./basket.module.css";



class Baskets extends Component {

  constructor(props) {
    super(props)
     
    this.modalref = createRef()
  
    this.state = {      
    }
  }

  Save = async () => {

    await this.props.onSave().then(()=>{
      this.modalref.current.openModal();
    })    

    }

  print = (e) =>{
    this.props.order.billCompleted = true;
    // onSubmit={(e)=>{e.preventDefault()}}
    // console.log(e);

    e.preventDefault()

     this.Save().then(()=>{
      window.location.replace("printBill/" + this.props.order._id);
     })

  }
  
  render() {
    const { order, onDelete, onChangeEvent,  inputChange, bgc } =
      this.props;

    return (
      <div className={style.tableDiv + " style" + bgc} >
       
        <div>
          <input
            type="text"
            value={order?.tableNo}
            name="tableNo"
            className={style.inputDiv}
            onChange={inputChange}
          />
        </div>
        <div className={style.divTable}>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th className="text-center">Qty</th>
                <th>Amt</th>
              </tr>
            </thead>
            <tbody>
              {order?.counters?.map((obj) => (
                <Basket
                  key={obj.id}
                  obj={obj}
                  onDelete={onDelete}
                  onChangeEvent={onChangeEvent}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className={style.summary}>
          <span>Count </span>
          <span> {order?.counters?.filter((c) => c.qty > 0).length}</span>
          <span>Total</span>
          <span className={style.amt}> {order?.totalAmt}</span>
          <button
            className="btn btn-sm btn-success font-weight-bold"
            onClick={this.Save}

          >
            <i className="fa fa-save" aria-hidden="true"></i> <span>Check Out</span>
          </button>
          
        </div>


        <Modal ref={this.modalref}>
          <form >
            
            <div className="row">
              <label htmlFor="" className="col-5">Bill Amount : </label>
              <span className="col-1 pt-1">Rs.</span>
              <input type="text" value={order?.totalAmt} name="totalAmt"
                onChange={inputChange} className="col-6" readOnly />
            </div>
            <div className="row">
              <label htmlFor="" className="col-5" >Discount </label>
              <span className="col-1 pt-1"> % </span>
              <input type="number" value={order?.discountper} min={0} max={100}  className="col-2 pl-1 text-center" name="discountper" onChange={inputChange} />
              <span className="col-1 pt-1 px-0 ">Rs(-)</span>
              <input type="number" value={order?.discountAmt} className="col-3" name="discountAmt" onChange={inputChange} />
            </div>
            <div className="row">
              <label htmlFor="" className="col-5" >Payable Amount </label>
              <span className="col-1 pt-1">Rs.</span>
              <input type="text" value={order?.payableamt} name="payableamt" onChange={inputChange} className="col-6" />
            </div>
            <div className="row">
              <label htmlFor="" className="col-6" >Payment Type </label>
              <select value={order?.payType} name="payType" onChange={inputChange} className="col-6" >
                <optgroup label="Payments">
                  <option value="CASH">CASH</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">CARD</option>
                </optgroup>
                <optgroup label="Online Orders">
                  <option value="SWIGGY">SWIGGY</option>
                  <option value="ZOMATO">ZOMATO</option>
                </optgroup>
                
              </select>
            </div>
            <button className="btn btn-info" onClick={this.print}>Print</button>
          </form>



        </Modal> 


      </div>

      
    );
  }
}

export default Baskets;
