import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import RptDailySales from "./RptDailySales";

function ReportsRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RptDailySales />} />
        <Route path="report1" element={<RptDailySales />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="d-flex px-2">
      <div className="linksdiv bg-light p-2 ">
        <Link to="report1">Report 1</Link>
      </div>
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default ReportsRouter;
