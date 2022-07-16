import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
})); 

describe('Pruebas enSearchPage', () => {

    beforeEach(()=> jest.clearAllMocks() );

    test('Debe de mostrarse correctamente con valores por defecto ', () => {
        const { conteiner } = render(
                                    <MemoryRouter>
                                        <SearchPage />
                                    </MemoryRouter>
                                );
        expect(conteiner).toMatchSnapshot();
    });
    test('Debe de mostrar a batman y el input con el querystring ', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
    
        const alert = screen.getByLabelText('search-label');
        expect(alert.style.display).toBe('none');

        const alertDanger = screen.getByLabelText('error-label');
        expect(alertDanger.style.display).toBe('none');
    });
    test('debe de mostrar un error si no encuentra el heroe(batman2)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman2']}>
                <SearchPage />
            </MemoryRouter>
        );
        const alertDanger = screen.getByLabelText('error-label');
        expect(alertDanger.style.display).toBe('');
        expect(alertDanger.textContent).toContain('batman2');
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );
        const inputValue = 'superman';
        const input = screen.getByRole('textbox');
        // const form = screen.getByRole('form');

        fireEvent.input(input, {target: {name: "searchText",value: inputValue}});
        fireEvent.submit( input ); 
        // fireEvent.submit( form ); 

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)

    });
});