import { PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { authSelector } from "../../store/selectors"
import { TUseLocation } from "../../types"
import { Loader } from "../loader/loader"

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children}: PropsWithChildren<TProtectedRouteProps>) => {  
    const { authChecked, user } = useSelector(authSelector)
    const location: TUseLocation = useLocation();

    if (!authChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user.isLogged) {        
        return <Navigate to={location.state?.from || '/'} replace/>
    }

    if (!onlyUnAuth && !user.isLogged) {
        return <Navigate to="/login" state={{ from: location }} replace/>
    }
   
    return (
        <>
        {children}
        </>
    )
}