import { createContext } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => (
    <ThemeContext.Provider value={{color: 'blue'}}>
        {children}
    </ThemeContext.Provider>
)