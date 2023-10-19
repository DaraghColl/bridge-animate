import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface Animations {
  opacity?: string;
  rotate?: string;
  translateX?: string;
  translateY?: string;
}

export type KeyframeTime = '0' | '0.25' | '0.50' | '0.75' | '1';

interface Keyframe {
  time: KeyframeTime;
  animations?: Animations[];
}

interface AnimationsList {
  name: string;
  keyframes: Keyframe[] | null;
}

interface AnimationsValue {
  animations: AnimationsList[] | null;
  createNewAnimation: (elementId: string) => void;
  createKeyframe: (animationName: string, keyframeTime: KeyframeTime) => void;
}

const AnimationsContext = createContext<AnimationsValue | undefined>(undefined);

interface AnimationsProviderProps {
  children: ReactNode;
}

const AnimationsProvider: FC<AnimationsProviderProps> = ({ children }) => {
  const [animations, setAnimations] = useState<AnimationsList[] | []>([]);

  useEffect(() => {
    console.log(animations);
  }, [animations]);

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

  const createKeyframe = (animationName: string, keyframeTime: KeyframeTime) => {
    console.log(animationName);
    console.log(keyframeTime);
    const keyframe: Keyframe = {
      time: keyframeTime,
    };

    const animationsCopy = [...animations];
    animationsCopy.forEach((animation) => {
      if (animation.name === animationName) {
        if (animation.keyframes && !animation.keyframes.find((keyframe) => keyframe.time === keyframeTime)) {
          animation.keyframes.push(keyframe);
        }
      }
    });

    setAnimations(animationsCopy);
  };

  return (
    <AnimationsContext.Provider value={{ animations, createNewAnimation, createKeyframe }}>
      {children}
    </AnimationsContext.Provider>
  );
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
