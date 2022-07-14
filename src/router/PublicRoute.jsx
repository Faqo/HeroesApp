import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {

    const { state } = useContext(AuthContext);

    

    return (!state.logged)
        ? children
        : <Navigate to='/marvel' />
}