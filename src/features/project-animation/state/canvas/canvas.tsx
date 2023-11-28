import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface CanvasValue {
  userSvg: string | null;
  setUserSvg: Dispatch<SetStateAction<string | null>>;
  formattedSVGForDownload: string | null;
  setFormattedSVGForDownload: Dispatch<SetStateAction<string | null>>;
}

const CanvasContext = createContext<CanvasValue | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

const CanvasProvider: FC<CanvasProviderProps> = ({ children }) => {
  const [userSvg, setUserSvg] = useState<string | null>(null);
  const [formattedSVGForDownload, setFormattedSVGForDownload] = useState<string | null>(null);

  return (
    <CanvasContext.Provider value={{ userSvg, setUserSvg, formattedSVGForDownload, setFormattedSVGForDownload }}>
      {children}
    </CanvasContext.Provider>
  );
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
