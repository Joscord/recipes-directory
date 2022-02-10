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
    color: 'blue'
}

export const ThemeProvider = ({ children }) => {
	// Cuando invocamos a useReducer pasamos el nombre de nuestra función reductora y como segundo argumento el estado inicial. Este hook retorna dos valores: el estado (el estado inicial que especificamos) y una función de despacho (dispatch function), la que nos permite despachar cambios de estado a nuestra función reductora. La función de despacho recibe un objeto como argumento conocido como una "acción de despacho". En este objeto podemos especificar dos propiedades: type (el tipo de acción, escrito en mayúsculas, por ejemplo CHANGE_COLOR) y el payload, que es data en la que queremos basar nuestro cambio de estado (por ejemplo un nuevo valor para color)
	const [color, dispatchColor] = useReducer(themeReducer, defaultState);

	// Definimos una función para cambiar el color y también podemos pasar por value y el provider
	const changeColor = newColor => {
		dispatchColor({
			type: 'CHANGE_COLOR',
			payload: newColor
		})
	}

	return (
        // Pasamos el estado de theme como valor
		<ThemeContext.Provider value={{color, changeColor}}>
			{children}
		</ThemeContext.Provider>
	);
};