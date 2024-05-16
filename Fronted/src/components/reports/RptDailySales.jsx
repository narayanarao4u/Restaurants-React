import React, { useEffect, useState } from "react";
import TableBody from "../table/tableBody";
import { Link } from "react-router-dom";
import { endOfDay, format } from "date-fns";

const initfilter = {
  frmDate: format(new Date(), "yyyy-MM-dd"),
  toDate: format(new Date(), "yyyy-MM-dd"),
};
const RptDailySales = () => {
  const [columns] = useState([
    {
      field: "billNo",
      label: `Bill No`,
      content: (m) => (
        <Link to={"/printBill/" + m._id}>
          {m.billNo.toString().padStart(4, "0")}
        </Link>
      ),
      show: true,
    },
    { field: "billDate", label: `Bill Date`, show: true },
    { field: "totalAmt", label: `Bill Amount`, show: true },
    { field: "discountAmt", label: "Discount", show: true },
    { field: "payableamt", label: "Paid Amount", show: true },
    { field: "payType", label: "Payment Type", show: true },
  ]);

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(initfilter);

  const handleClick = () => {
    const searchParams = new URLSearchParams(filterData);
    fetch("http://localhost:3005/api-order/bills?" + searchParams)
      .then((response) => response.json())
      .then((data) => setData(data.data));
  };

  useEffect(() => {
    // Call the fetch function initially to populate data on mount
    handleClick(); // Call the click handler here
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h3>Sale Reports</h3>
        <div className="d-flex">
          <input
            type="date"
            className="form-control"
            value={filterData.frmDate}
            onChange={(e) =>
              setFilterData({ ...filterData, frmDate: e.target.value })
            }
          />
          <span className=" p-2 bg-secondary text-white"> To </span>
          <input
            type="date"
            className="form-control"
            value={filterData.toDate}
            onChange={(e) =>
              setFilterData({ ...filterData, toDate: e.target.value })
            }
          />
          <button className="btn btn-primary" onClick={handleClick}>
            Get Data
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((o, i) => (
              <th key={i}> {o.label} </th>
            ))}
          </tr>
        </thead>
        <TableBody columns={columns} data={data} />
        {/* <tbody>
            {
              data.map((d,i) =>(
                <tr key={i}>
                  <td>{i+1}</td>
                   {columns.map((o,i) => (
                    <td key={i}> {d[o.field]} </td>
                  ))}
                </tr>
              ))
            }
          </tbody> */}
      </table>
    </div>
  );
};

export default RptDailySales;
