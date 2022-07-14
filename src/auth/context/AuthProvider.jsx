import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./AuthReducer"

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        logged: !!user,
        user,
    }
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = '') => {
        const user = {
            id: '123',
            name: name
        };

        const action = {
            type: types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        const action = {
            type: types.logout
        };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            state,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}