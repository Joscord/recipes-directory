import './ThemeSelector.css';
import useTheme from '../../hooks/useTheme';
import modeIcon from '../../assets/icons/mode-icon.svg'

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();
  const themeColors = ['#58249c', '#249c6b', '#b70233']

  const handleToggle = () => changeMode(mode === 'light' ? 'dark' : 'light')

  return (
    <div className='theme-selector'>
        <div className='mode-toggle'>
            {/* Usamos invert para manejar el contraste de la imagen dependiendo de su modo */}
            <img src={modeIcon} alt='mode-toggle icon' onClick={handleToggle} style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}/>
        </div>
        <div className='theme-buttons'>
            {
                themeColors.map(color => (
                    <div key={color} onClick={() => changeColor(color)} style={{background: color}}/>
                ))
            }
        </div>
    </div>
  )
}

export default ThemeSelector;