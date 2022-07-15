import { render, screen } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en publicRoute', () => {

    test('Debe de mostrar el children si no esta autenticado', () => {
        const contextValue =  { logged: false } 
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Ruta Publica')).toBeTruthy();

    });

    test('debe de navegar si esta autenticado', () => {
        const contextValue = { logged: true, user: { name: 'strider', id: 'abc' } } 
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Pagina Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    });
});