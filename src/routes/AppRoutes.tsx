import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "../pages/customer/Login";
import { Register } from "../pages/customer/Register";
import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoutes } from "./AdminRoutes";
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Pulbic Routes */}

        {/* Customer and Admin Routes */}
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};
