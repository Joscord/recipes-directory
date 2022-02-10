// Importamos useReducer
import { createContext, useReducer } from 'react';

export const ThemeContext = createContext();

// Definimos la función reductora. Dos parámetros, el estado actual y la acción despachada (el objeto acción) por la función de dispatch. Esta función luego retorna un nuevo estado.
const themeReducer = (state, action) => {
    // Podemos usar switch para revisar las acciones
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}
// Definimos el estado inicial o por defecto
const defaultState = {
    color: '#58249c'
}

export const ThemeProvider = ({ children }) => {
	const [color, dispatchColor] = useReducer(themeReducer, defaultState);

	const changeColor = newColor => {
		dispatchColor({
			type: 'CHANGE_COLOR',
			payload: newColor
		})
	}

	return (
        // Pasamos el estado de theme como valor, nótese que usamos el ... para pasar todas las propiedades de ese estado
		<ThemeContext.Provider value={{...color, changeColor}}>
			{children}
		</ThemeContext.Provider>
	);
};