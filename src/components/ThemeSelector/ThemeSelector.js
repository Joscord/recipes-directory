import './ThemeSelector.css';
import useTheme from '../../hooks/useTheme';
// Importamos nuestro SVG, para hacerlo de este modo la carpeta assets debe estar en src y no en public
import modeIcon from '../../assets/icons/mode-icon.svg'

const ThemeSelector = () => {
    // Destructuramos la función para cambiar el modo y el modo
  const { changeColor, changeMode, mode } = useTheme();
  const themeColors = ['#58249c', '#249c6b', '#b70233']

  // Creamos la función para manejr el toggle entre los modos
  const handleToggle = () => changeMode(mode === 'light' ? 'dark' : 'light')
  
  return (
    <div className='theme-selector'>
        <div className='mode-toggle'>
            <img src={modeIcon} alt='mode-alt' onClick={handleToggle}/>
        </div>
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