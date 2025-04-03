import { Route, Routes } from "react-router-dom";
import { CustomerLayout } from "../layouts/CustomerLayout";
import { Home } from "../pages/customer/Home";
import { SecureRoute } from "./SecureRoute";

export const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />

        <Route path="user" element={<SecureRoute />}>
          <Route path="profile" element={<div>Secure</div>} />
          <Route path="orders" element={<div>Orders</div>} />
        </Route>
      </Route>
    </Routes>
  );
};
