import React from "react";
import TableHeader from "./tableheader";
import TableBody from "./tableBody";

const Table = ({columns, sortColumn, onSort, data}) => {
  return (
    <table className="table table-sm">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
