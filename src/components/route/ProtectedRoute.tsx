import {useSelector} from 'react-redux';
import {matchPath, Navigate} from 'react-router-dom';
import {customerPrivateRoutes, publicRoutes, RouteType} from "@/routes";
import {User, UserRole} from "@/types/models.ts";
import {RootState} from "@/redux/store.ts";
import {ROUTES} from "@/types/constant.ts";
import {hasRole} from "@/lib/utils.ts";

interface ProtectedRouteProps {
    route: RouteType;
    children: React.ReactNode;
}

const matchRoute = (pathPattern: string, currentPath: string) => {
    return matchPath({path: pathPattern, end: true}, currentPath) !== null;
};

const hasAccess = (route: RouteType, user: User | null): boolean => {
    const currentPath = route.path;
    const isPublicRoute = publicRoutes.some((r) =>
        matchRoute(r.path, currentPath),
    );
    const isPrivateRoute = customerPrivateRoutes.some((r) =>
        matchRoute(r.path, currentPath),
    );

    if (isPublicRoute) return true;
    if (!user) {
        return false;
    }

    if (hasRole([UserRole.ROLE_ADMIN, UserRole.ROLE_EMPLOYEE], user.roles)) {
        return true;
    }

    if (hasRole([UserRole.ROLE_CUSTOMER], user.roles)) {
        return isPrivateRoute;
    }
    return false;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({route, children}) => {
    const {me, isLoading} = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return; // or a loading spinner

    }

    if (!hasAccess(route, me)) {
        return <Navigate to={ROUTES.HOME} replace/>;
    }

    return <>{children}</>;
};
export default ProtectedRoute;

