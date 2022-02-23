import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

const PrivateRoute: FC<RouteProps> = (props) => {
    const { children, ...rest } = props;
    const user = useAppSelector((store) => store.authentication.user);

    if (!user) {
        return <Redirect to="login" />;
    }

    return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
