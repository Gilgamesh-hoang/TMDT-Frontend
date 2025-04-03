import React from "react";
import { Route, Routes } from "react-router-dom";

export const AdminRoute = () => {
  return <div></div>;
};
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route index path="/admin" element={<div>Dashboard</div>} />
        <Route path="/products" element={<div>ManageProduct</div>} />
      </Route>
    </Routes>
  );
};
