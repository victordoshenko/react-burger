import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { authSelector } from "../../store/selectors"
import { Loader } from "../loader/loader"

export const ProtectedRoute = ({ onlyUnAuth = false, children}) => {
    const { authChecked, user } = useSelector(authSelector)
    const location = useLocation();

    if (!authChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user.isLogged) {
        let to = '/';
        if (location.state !== null && typeof location.state.from !== 'undefined') {
            to = location.state.from
        }
        return <Navigate to={to} replace/>
    }

    if (!onlyUnAuth && !user.isLogged) {
        return <Navigate to="/login" state={{ from: location }} replace/>
    }

    return children
}