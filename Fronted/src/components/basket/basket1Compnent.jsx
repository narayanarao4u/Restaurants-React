import React, { Component } from "react";

class Basket extends Component {
  state = {
    count: 0,
    imgUrl: "https://picsum.photos/100",
    tags: ["tag1", "tag2", "tag3"],
    // tags: [],
  };
  styles1 = {
    fontSize: "32px",
    fontWeight: "bold",
  };
  render() {
    // this.state.count++;
    return (
      <div className="container">
        {/* <img src={this.state.imgUrl} alt="" /> */}
        <p style={this.styles1}>Basket</p>
        <hr />
        <span className={this.getBabgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm" onClick={this.handleIncr}>
          Increment
        </button>
        <hr />
        {this.state.tags.length === 0 && "Pleae Create New Tags"}
        {this.renderTags()}
      </div>
    );
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>Tag list is empty</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncr = () => {
    // console.log("increment Clicked", this.state.count);

    this.setState({ count: this.state.count + 1 });
  };

  getBabgeClasses() {
    let classes = "badge m-2  badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  }
}

export default Basket;
