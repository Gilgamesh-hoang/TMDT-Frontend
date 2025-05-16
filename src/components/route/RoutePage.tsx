import {Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.tsx';
import {RouteType} from "@/routes";
import {CustomerLayout} from "@/layouts/CustomerLayout.tsx";

const RoutePage = (route: RouteType, index: number) => {
    const Layout = route.layout || CustomerLayout;
    const Page = route.element;
    const ChildrenNode = route.children ?? [];
    return (
        <Route
            key={route.path + index}
            path={route.path}
            element={
                <ProtectedRoute route={route}>
                    <Layout>
                        <Page/>
                    </Layout>
                </ProtectedRoute>
            }
        >
            {ChildrenNode.map((routeObject, index: number) =>
                RoutePage(routeObject, index),
            )}
        </Route>
    );
};
export default RoutePage;
