import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en appRouter', () => {
    test('Debe mostrat el login si no esta autenticado', () => {
        const contextValue = {
            logged: false,
        }
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('Debe mostrar el componente de marvel si esta autenticado', () => {
        const contextValue = { 
            logged: true, 
            user: { 
                name: 'strider', 
                id: 'abc' } 
            };
            render(
                <MemoryRouter initialEntries={['/login']} >
                    <AuthContext.Provider value={contextValue}>
                        <AppRouter />
                    </AuthContext.Provider>
                </MemoryRouter>
            );
        expect(screen.getByText('Marvel Comics')).toBeTruthy();
    });
});