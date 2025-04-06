import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { CustomerRoutes } from "./CustomerRoutes";
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
