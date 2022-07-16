import { render, screen,fireEvent } from '@testing-library/react';
import { Navbar } from '../../../src/ui';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
})); //Esto permite hacer un mock de una funcion especifica que una libreria

describe('Pruebas en Navbar', () => {
    const contextValue = { 
        logged: true, 
        user: { 
            name: 'strider', 
            id: 'abc' } 
        };
    beforeEach(()=> jest.clearAllMocks() );
        
    test('Debe mostrar el nombre del usuario autenticado', () => {
        
        render(
            <MemoryRouter initialEntries={['/marvel']} >
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('strider')).toBeTruthy();
    });
    test('debe llamar a la funcion de logout', () => {
        const logoutMock = jest.fn();
 
        render(
            <MemoryRouter initialEntries={['/marvel']} >
                <AuthContext.Provider value={{...contextValue,logout:logoutMock}}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(logoutMock).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    });
});