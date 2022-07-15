import { authReducer, types } from "../../../src/auth";

describe('Pruebas en AuthReducer', () => {

    const initialState = {logged:false}

    test('El componente debe retornar el estado por defecto', () => {
        const state = authReducer(initialState);
        expect(state).toEqual(initialState);
    });

    test('El componente debe llamar al login y establecer usuario', () => {
        const state = authReducer(initialState,{
            type: types.login,
            payload:{
                id:'1234',
                name:'Frank Quiroz'
            }
        });
        expect(state.logged).toBeTruthy();
        expect(state.user).toEqual({id:'1234',
                                        name:'Frank Quiroz'});
    });

    test('El componente debe corrar el usuario del estado actual', () => {
        const prevState = {
            logged:true, 
            user:
                {id:'1234',
                name:'Frank Quiroz'
            }};
        
        const newState = authReducer(prevState, {type:types.logout});

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBeUndefined();
    });
});