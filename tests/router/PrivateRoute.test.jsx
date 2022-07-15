import { AuthContext } from "../../src/auth";
import { render,screen } from '@testing-library/react';
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en PrivateRoute', () => {
    test('Debe de mostrar el children si esta autenticado', () => {
        
        Storage.prototype.setItem = jest.fn();
        //esto servira para evaluar si se llamo el localstorage.setitem.

        const contextValue =
        {logged: true, 
           user:
           {
               name: 'strider', id: 'abc'
           }}
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
    });
});