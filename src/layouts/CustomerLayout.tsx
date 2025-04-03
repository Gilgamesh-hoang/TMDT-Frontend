import React from "react";
import { Header } from "../components/customer/Header";
import { Footer } from "../components/customer/Footer";
import { Outlet } from "react-router-dom";

export const CustomerLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
