import { useContext } from 'react'
import { AuthContext } from '../auth'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const { state } = useContext(AuthContext);

    const {pathname, search} = useLocation()

    const lastPath = pathname + search;

    localStorage.setItem('lastPath', lastPath);

    //se podria agregar un useMemo para que no re renderice el componente pero no es parte del curso hacerlo.

    return (state.logged)
        ? children
        : <Navigate to="/login" />
}   