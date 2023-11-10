import { FC, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');

    console.log(theme);

    theme === 'dark'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark');
  };

  return (
    <button
      className="transition duration-100 ease-in-out active:scale-95"
      id="theme_toggle"
      aria-label="theme toggle button"
      onClick={() => handleThemeSwitch()}
    >
      {theme === 'light' && <MoonIcon className="h-4 w-4 cursor-pointer" />}
      {theme === 'dark' && <SunIcon className="h-4 w-4 cursor-pointer" />}
    </button>
  );
};

export { ThemeToggle };
