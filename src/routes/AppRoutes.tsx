import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  adminRoutes,
  customerPrivateRoutes,
  publicRoutes,
  RouteType,
} from "@/routes/index.ts";
import RoutePage from "@/components/route/RoutePage.tsx";
import Error404 from "@/pages/customer/Error404.tsx";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route: RouteType, index: number) =>
          RoutePage(route, index),
        )}

        {customerPrivateRoutes.map((route: RouteType, index: number) =>
          RoutePage(route, index),
        )}

        {adminRoutes.map((route: RouteType, index: number) =>
          RoutePage(route, index),
        )}
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </Router>
  );
};
