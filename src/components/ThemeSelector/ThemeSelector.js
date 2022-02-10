import './ThemeSelector.css';
// Importamos el custom hook del contexto
import useTheme from '../../hooks/useTheme';

const ThemeSelector = () => {
    // Destructuramos la función de cambio de color
  const { changeColor } = useTheme();
  // Hacemos un arreglo para los colores
  const themeColors = ['#58249c', '#249c6b', '#b70233']
  return (
    <div className='theme-selector'>
        <div className='theme-buttons'>
            {
                themeColors.map(color => (
                    // Creamos divs con funciones vinculadas al evento click, así cambiamos los colores
                    <div key={color} onClick={() => changeColor(color)} style={{background: color}}/>
                ))
            }
        </div>
    </div>
  )
}

export default ThemeSelector;