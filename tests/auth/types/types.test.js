import { types } from "../../../src/auth";

describe('Pruebas de Types', () => {
    test('debe regresar los types correspondientes', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
    });
});