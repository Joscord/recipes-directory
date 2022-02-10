import { createContext, useReducer } from 'react';

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_COLOR':
			return {
				...state,
				color: action.payload,
			};
        case 'CHANGE_MODE':
            return {
                // Es importante recordar que debemos hacer spread del estado viejo y cambiarlo añadiendo la propiedad nueva, no devolver un estado "nuevo"
                ...state,
                mode: action.payload,
            }
		default:
			return state;
	}
};
// Modificamos el estado por default añadiendo una nueva propiedad, el modo
const defaultState = {
	color: '#58249c',
	mode: 'light',
};

export const ThemeProvider = ({ children }) => {
	const [state, dispatchState] = useReducer(themeReducer, defaultState);

	const changeColor = newColor =>
		dispatchState({
			type: 'CHANGE_COLOR',
			payload: newColor,
		});

	// Creamos una función para cambiar el modo
	const changeMode = newMode =>
		dispatchState({ type: 'CHANGE_MODE', payload: newMode });

	return (
		<ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
