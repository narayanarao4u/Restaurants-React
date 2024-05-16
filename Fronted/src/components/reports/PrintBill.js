import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";

import { getOrderDetails } from "../../utiles/datafunction";

import style from "./PrintBill.module.css";

function PrintBill() {
  const portalElement = document.getElementById("modal-root");

  let { id } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrderDetails(id).then((data) => {
      if (data.data) setOrder(data.data[0]);
    });
  }, [id]);

  let showtable = () => {
    if (order._id) {
      return (
        <table>
          <thead>
            <tr>
              <th>Item</th>

              <th className="text-center">Qty</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody>
            {order?.counters?.map((obj, i) => (
              <tr key={i}>
                <td>
                  {obj.item.itemName} @{" "}
                  <span className={style.amt}>{obj.price}</span>
                </td>

                <td>{obj.qty}</td>
                <td className={"text-right " + style.amt}>{obj.amt}</td>
              </tr>
            ))}
            <tr className="font-weight-bold border-top border-dark">
              <td>Total Amount</td>
              <td colSpan={2} className={"text-right " + style.amt}>
                {order.totalAmt}
              </td>
            </tr>
            {order.discountAmt > 0 && (
              <tr>
                <td>Discount Amount @ ({order.discountper}%) </td>
                <td colSpan={2} className={"text-right " + style.amt}>
                  ( - ) {order.discountAmt}
                </td>
              </tr>
            )}
            <tr className={style.footer}>
              <td>Payable Amount</td>
              <td colSpan={2} className={"text-right " + style.amt}>
                {order.payableamt}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return createPortal(
    <div className={style.printContainer}>
      <div className={style.banner}>
        <div className={style.title}>{process.env.REACT_APP_TITLE} </div>
        <div className={style.line1}>
          Beach Road, Rushikonda, Visakhapatnam <br />
          Phone : 0891-27589613
        </div>
      </div>

      <div className={style.billDetails}>
        <div>
          <span>BillNo : </span>
          <span>{order?.billNo?.toString().padStart(4, "0")}</span>
        </div>
        <div>
          <span>Date : </span>
          <span>{order?.updatedAt?.substr(0, 16)}</span>
        </div>
      </div>

      <div className={style.billDetails}>
        <div>
          <span>Table : </span>
          <span>{order?.tableNo}</span>
        </div>
        <div>
          <span>Payemnt : </span>
          <span>{order?.payType}</span>
        </div>
      </div>

      {showtable()}
    </div>,
    portalElement
  );
}

export default PrintBill;
