// Importamos useContext
import { useContext } from "react";
// Importamos el contexto
import { ThemeContext } from "../context/ThemeContext";

import React from 'react'

const useTheme = () => {
    // Vamos a almacenar el contexto en una variable contexto
    const context = useContext(ThemeContext);
    // Hacemos un checkeo del contexto. El contexto es indefinido si intentamos usarlo fuera de su scope. Es decir, un componente que no esté anidado en el proveedor
    if (context === undefined) {
        // Vamos a arrojar un error para indicar que el uso de este hook debe estar dentro del scope del proveedor. Nótese que en este caso esto no importa porque el proveedor envuelve toda la app
        throw new Error('useTheme must be used inside a ThemeProvider')
    }
    // Retornamos el contexto
    return context
}

export default useTheme;