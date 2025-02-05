import { FC } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeContext } from '@shared/state/theme/theme';

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <button
      className="transition duration-100 ease-in-out active:scale-95"
      id="theme_toggle"
      aria-label="theme toggle button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      data-cy="theme_toggle_button"
    >
      {theme === 'light' && <MoonIcon className="h-4 w-4 cursor-pointer" data-cy="theme_toggle_moon_icon" />}
      {theme === 'dark' && <SunIcon className="h-4 w-4 cursor-pointer" data-cy="theme_toggle_sun_icon" />}
    </button>
  );
};

export { ThemeToggle };
