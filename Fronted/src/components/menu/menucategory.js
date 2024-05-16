import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuCategory extends Component {
  state = {
    category: ["ALL"],
  };

  componentDidMount() {
    fetch("http://localhost:3005/api/menu/category")
      .then((response) => response.json())
      .then((data) => {
        data.data.unshift("ALL");
        this.setState({ category: data.data });
      });
  }

  render() {
    const {
      onItemSelected,
      selectedItem,
      searchtxt,
      handleChange,
      handleKeyUp,
    } = this.props;
    // console.log(this.props);
    return (
      <ul className="nav nav-tabs">
        {this.state.category.map((x, index) => {
          return (
            <li key={index} className="nav-item">
              <Link
                to={"#"}
                className={x === selectedItem ? "nav-link active" : "nav-link"}
                onClick={() => onItemSelected(x)}
              >
                {x}
              </Link>
            </li>
          );
        })}
        <li style={{ marginLeft: "auto" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchtxt}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </li>
      </ul>
    );
  }
}

export default MenuCategory;
