import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface CanvasValue {
  userSvg: string | null;
  setUserSvg: Dispatch<SetStateAction<string | null>>;
}

const CanvasContext = createContext<CanvasValue | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

const CanvasProvider: FC<CanvasProviderProps> = ({ children }) => {
  const [userSvg, setUserSvg] = useState<string | null>(null);
  // const [previousCanvasID, setPreviousCanvasId] = useState<string>('');

  return <CanvasContext.Provider value={{ userSvg, setUserSvg }}>{children}</CanvasContext.Provider>;
};

const useCanvasContext = () => {
  const canvasContext = useContext(CanvasContext);
  if (canvasContext === undefined) {
    throw new Error('useCanvasContext must be inside a CanvasProvider');
  }
  return canvasContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CanvasProvider, useCanvasContext };
