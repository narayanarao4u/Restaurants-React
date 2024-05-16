import React, { Component, createRef } from "react";
import MenuTable from "./menuTable";
import Pagenation from "../common/pagination";
import { paginate } from "../../utiles/paginate";
import MenuCategory from "./menucategory";
import _ from "lodash";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.onLineOrder = createRef();
    this.MenuTable = createRef();

    this.state = {
      movies: [],
      pageSize: 10,
      currentPage: 1,
      selectedCategory: "ALL",
      searchtxt: "",
      sortColumn: { field: "itemName", order: "asc" },
      onLinePrice: false,
    };
  }

  //#region  functions
  handleLike = (movie) => {
    // console.log("Like Clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  itemUpdate = (movie, type) => {
    let movies = [...this.state.movies];

    if (type === "POST") {
      movies.push(movie);
      this.setState({ movies });
    } else if (type === "PUT") {
      const index = _.findIndex(movies, { _id: movie._id });
      movies[index] = movie;
      this.setState({ movies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = (x) => {
    this.setState({ selectedCategory: x, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  componentDidMount() {
    fetch("http://localhost:3005/api/menu")
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.data }));
  }

  getPagaData = () => {
    const {
      pageSize,
      currentPage,
      selectedCategory,
      sortColumn,
      searchtxt,
      movies: allMovies,
    } = this.state;

    const filtered_1 =
      selectedCategory !== "ALL"
        ? allMovies.filter((m) => m.category === selectedCategory)
        : allMovies;

    let filtered = filtered_1.filter((m) =>
      m.itemName.toLowerCase().includes(searchtxt.toLowerCase())
    );

    const sorted = _.orderBy(filtered, [sortColumn.field], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleChange = (e) => {
    const searchtxt = e.target.value;
    this.setState({ searchtxt });
  };

  handleKeyUp = (e) => {
    // const searchtxt = e.target.value;
    if (e.key === "ArrowDown") {
    }
  };

  onLineOrderChange = () => {
    let show = this.onLineOrder.current.checked;
    this.MenuTable.current.onLinePrice(show);
  };
  //#endregion  functions

  renderMenu = () => {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>No movies to display</p>;

    const { totalCount, data: movies } = this.getPagaData();

    return (
      <React.Fragment>
        {/* <span>Showin {count} movies in the Database </span> */}
        <div className="d-flex justify-content-between">
          <h4>
            {this.props.title} ({totalCount})
          </h4>
          <span>
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                ref={this.onLineOrder}
                onChange={this.onLineOrderChange}
              />{" "}
              Online Price
            </label>
          </span>
        </div>

        <MenuCategory
          selectedItem={this.state.selectedCategory}
          onItemSelected={this.handleCategorySelect}
          searchtxt={this.searchtxt}
          handleChange={this.handleChange}
          handleKeyUp={this.handleKeyUp}
        ></MenuCategory>

        <MenuTable
          ref={this.MenuTable}
          movies={movies}
          btnClick={this.props.btnClick}
          btnOpt={this.props.title}
          onLinePrice={this.state.onLinePrice}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
        ></MenuTable>

        <Pagenation
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChage={this.handlePageChange}
        />
      </React.Fragment>
    );
  };

  render() {
    return <main className="container">{this.renderMenu()}</main>;
  }
}

Menu.defaultProps = {
  title: "Menu",
};
export default Menu;
