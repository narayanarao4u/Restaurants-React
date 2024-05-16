import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (field) => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.field === field)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.field = field;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn} = this.props;

    if(column.field !== sortColumn.field) return null;
    
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />

    return <i className="fa fa-sort-desc" />

  }

  menuTH = {
    cursor: "pointer",
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
              if(column.show)  return (          
                <th
                  key={column.field}
                  onClick={() => this.raiseSort(column.field)}
                  className="bg-light"
                  style={this.menuTH}
                >
                  {column.label} {this.renderSortIcon(column)}
                </th>
              )             
          } )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
