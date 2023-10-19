import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface Animations {
  opacity?: string;
  rotate?: string;
  translateX?: string;
  translateY?: string;
}

interface Keyframes {
  time: '0' | '0.25' | '0.50' | '0.75' | '1';
  animations?: Animations[];
}

interface AnimationsList {
  name: string;
  keyframes: Keyframes[] | [];
}

interface AnimationsValue {
  animations: AnimationsList[] | null;
  createNewAnimation: (elementId: string) => void;
}

const AnimationsContext = createContext<AnimationsValue | undefined>(undefined);

interface AnimationsProviderProps {
  children: ReactNode;
}

const AnimationsProvider: FC<AnimationsProviderProps> = ({ children }) => {
  const [animations, setAnimations] = useState<AnimationsList[] | []>([]);

  const createNewAnimation = (elementId: string) => {
    if (animations.some((animation) => animation.name === elementId)) {
      return;
    }

    const newAnimation = {
      name: elementId,
      keyframes: [],
    };

    setAnimations([...animations, newAnimation]);
  };

  return <AnimationsContext.Provider value={{ animations, createNewAnimation }}>{children}</AnimationsContext.Provider>;
};

const useAnimationsContext = () => {
  const aniationsContext = useContext(AnimationsContext);
  if (aniationsContext === undefined) {
    throw new Error('useSelectedElementContext must be inside a SelectedElementProvider');
  }
  return aniationsContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AnimationsProvider, useAnimationsContext };
