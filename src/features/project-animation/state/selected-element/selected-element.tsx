import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface SelectedElementValue {
  selectedElementID: string | null;
  setSelectedElementId: Dispatch<SetStateAction<string | null>>;
}

const SelectedElementContext = createContext<SelectedElementValue | undefined>(undefined);

interface SelectedElementProviderProps {
  children: ReactNode;
}

const SelectedElementProvider: FC<SelectedElementProviderProps> = ({ children }) => {
  const [selectedElementID, setSelectedElementId] = useState<string | null>(null);
  const [previousSelectedElementID, setPreviousSelectedElementId] = useState<string>('');

  useEffect(() => {
    if (!selectedElementID) return;
    document.getElementById(previousSelectedElementID)?.classList.remove('outline', 'outline-accent');
    document.getElementById(selectedElementID)?.classList.add('outline', 'outline-accent');
    setPreviousSelectedElementId(selectedElementID);
  }, [selectedElementID, previousSelectedElementID]);

  return (
    <SelectedElementContext.Provider value={{ selectedElementID, setSelectedElementId }}>
      {children}
    </SelectedElementContext.Provider>
  );
};

const useSelectedElementContext = () => {
  const selectedElementContext = useContext(SelectedElementContext);
  if (selectedElementContext === undefined) {
    throw new Error('useSelectedElementContext must be inside a SelectedElementProvider');
  }
  return selectedElementContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SelectedElementProvider, useSelectedElementContext };
