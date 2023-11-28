import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface Theme {
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (themeContext === undefined) {
    throw new Error('useThemeContext must be inside a ThemeProvider');
  }
  return themeContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useThemeContext };
