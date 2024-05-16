import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ tables, getTableOrder }) => {
  //https://webkul.github.io/coolhue/
  console.log(process.env.REACT_APP_TITLE);

  return (
    <nav className="navbar navbar-dark bg-dark py-0">
      <Link className="navbar-brand" to="/">
        <span> {process.env.REACT_APP_TITLE} </span>
        <span className="badge badge-pill badge-secondary">
          {tables.length}
        </span>
        <div className="flex-row d-inline-flex ml-3">
          <div
            className={"m-1 btn style" + 0}
            onClick={() => getTableOrder(0, 0)}
          >
            New
          </div>
          {tables.map((t, i) => (
            <div
              key={t._id}
              className={"m-1 btn bg-primary style" + (i + 1)}
              onClick={() => getTableOrder(t._id, i + 1)}
            >
              {t.tableNo}
            </div>
          ))}
        </div>
      </Link>
      <Link className="nav-item nav-link" to="editmenu">
        Edit Menu
      </Link>
      <Link className="nav-item nav-link" to="reports" target="_blank">
        Report
      </Link>
    </nav>
  );
};

export default NavBar;
