import React, { Component, createRef } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Baskets from "./components/basket/basketsComponent";
import Menu from "./components/menu/menuComponent";
import NavBar from "./components/navbar";

import EditMenu from "./components/EditMenu";
import PrintBill from "./components/reports/PrintBill";

import { getOrderDetails } from "./utiles/datafunction";
import ReportsRouter from "./components/reports/ReportsRouter";

//add commment for testedddd


class App extends Component {
  constructor(props) {
    super(props);

    this.newOrder = {
      counters: [],
      totalAmt: 0,
      tableNo: "Table",
      billDate: new Date(),
      billCompleted: false,
      discountper: 0,
      discountAmt: 0,
      payableamt: 0,
      payType: "CASH",
    };

    this.Menu = createRef();

    this.bgc = 0;

    this.state = {
      order: this.newOrder,
      tables: [],
      bgc: this.bgc,
      id: 0,
    };
  }

  handleDelete = (counterId) => {
    // console.log("Event CounterID", counterId);
    const counters = this.state.order.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.order.counters.map((e) => {
      e.qty = 0;
      return e;
    });
    this.setState({ counters });
  };

  saveData = async () => {
    if (this.state.order.counters.length === 0) return 0;

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.order),
    };

    if (this.state.order._id) {
      options.method = "PUT";
    } else {
      options.method = "POST";
    }

    await fetch("http://localhost:3005/api-order", options)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ order: data.data });
      });

    this.getPendingTables();
  };

  handleChange = (obj, x) => {
    const counters = [...this.state.order.counters];
    let totalAmt = this.state.order.totalAmt;
    let order = this.state.order;

    const idx = counters.indexOf(obj);
    counters[idx] = { ...obj };
    totalAmt -= counters[idx].amt;
    counters[idx].qty = counters[idx].qty + x;
    counters[idx].qty = counters[idx].qty < 0 ? 0 : counters[idx].qty;
    counters[idx].amt = counters[idx].qty * counters[idx].price;
    totalAmt += counters[idx].amt;
    order.counters = counters;
    order.totalAmt = totalAmt;

    order.discountper = 0;
    order.discountAmt = 0;
    order.payableamt = totalAmt;

    this.setState({ order });
  };

  inputChange = (e) => {
    // console.log(e.target.value);
    let order = { ...this.state.order };
    order[e.target.name] = e.target.value;

    switch (e.target.name) {
      case "discountper":
        order.discountAmt = Math.round(order.discountper * 0.01 * order.totalAmt);
        order.payableamt = order.totalAmt - order.discountAmt;
        break;

      case "discountAmt":
        order.discountper = Math.round(((order.discountAmt * 100) / order.totalAmt) * 100) / 100;
        order.payableamt = order.totalAmt - order.discountAmt;
        break;

      default:
        break;
    }

    this.setState({ order });
  };

  handleAddItem = (item) => {
    const counters = [...this.state.order.counters];
    let totalAmt = this.state.order.totalAmt;
    let order = this.state.order;

    let onlinePrice = this.Menu.current.onLineOrder.current.checked;
    let price = onlinePrice ? item.onlineprice : item.price;

    const row = {
      item: item,
      qty: 1,
      price: price,
      amt: price,
      id: counters.length + 1,
    };
    counters.unshift(row);
    totalAmt += item.price;
    order.counters = counters;
    order.totalAmt = totalAmt;

    order.discountper = 0;
    order.discountAmt = 0;
    order.payableamt = totalAmt;

    this.setState({ order });
  };

  componentDidMount() {
    this.getPendingTables();
  }

  async getPendingTables() {
    await fetch("http://localhost:3005/api-order/pending")
      .then((response) => response.json())
      .then((data) => this.setState({ tables: data.data }));
  }

  getTableOrder = async (id, bgc) => {
    this.setState({ id });
    this.saveData()
      .then(() => {
        if (id === 0) {
          let neworder = { ...this.newOrder };
          // console.log(neworder.tableNo);
          let pendingTables = this.state.tables.length;
          neworder.tableNo = `${neworder.tableNo} ${pendingTables + 1}`;

          this.setState({ order: neworder }, () => {});
        } else {
          getOrderDetails(id)
            .then((data) => {
              this.setState({ order: data.data[0] });
            })
            .then(() => {
              this.setState({ bgc });
            });
        }
      })
      .then(() => {
        this.getPendingTables();
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar tables={this.state.tables} getTableOrder={this.getTableOrder} />
        <Routes>
          <Route path="/reports/*" element={<ReportsRouter />} />
          <Route path="/editmenu" element={<EditMenu />} />
          <Route path="/printBill/:id" element={<PrintBill />} />
          <Route
            path="/"
            element={
              <div className="container mainGrid">
                <section>
                  <Baskets
                    bgc={this.state.bgc}
                    order={this.state.order}
                    inputChange={this.inputChange}
                    onDelete={this.handleDelete}
                    onChangeEvent={this.handleChange}
                    onSave={this.saveData}
                  />
                </section>

                <Menu btnClick={this.handleAddItem} ref={this.Menu} />
              </div>
            }
          />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
