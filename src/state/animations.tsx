import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

export type Style = 'opacity' | 'rotate' | 'translateX' | 'translateY';

export type KeyframeTime = '0' | '0.25' | '0.50' | '0.75' | '1';

interface Keyframe {
  time: KeyframeTime;
  styles: string[];
}

export interface AnimationsList {
  name: string;
  keyframes: Keyframe[];
}

interface AnimationsValue {
  animations: AnimationsList[] | null;
  createNewAnimation: (elementId: string) => void;
  createKeyframe: (animationName: string, keyframeTime: KeyframeTime) => void;
  selectedKeyFrameTime: KeyframeTime | null;
  setSelectedKeyFrameTime: Dispatch<SetStateAction<KeyframeTime | null>>;
  createKeyframeStyles: (selectedElementID: string, style: Style, value: string) => void;
}

const AnimationsContext = createContext<AnimationsValue | undefined>(undefined);

interface AnimationsProviderProps {
  children: ReactNode;
}

const AnimationsProvider: FC<AnimationsProviderProps> = ({ children }) => {
  const [animations, setAnimations] = useState<AnimationsList[] | []>([]);
  const [selectedKeyFrameTime, setSelectedKeyFrameTime] = useState<KeyframeTime | null>(null);

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
    const keyframe: Keyframe = {
      time: keyframeTime,
      styles: [],
    };

    const animationsCopy = [...animations];
    animationsCopy.forEach((animation) => {
      if (animation.name === animationName) {
        if (animation.keyframes && !animation.keyframes.find((keyframe) => keyframe.time === keyframeTime)) {
          animation.keyframes.push(keyframe);
        }
        setSelectedKeyFrameTime(keyframe.time);
      }
    });

    setAnimations(animationsCopy);
  };

  const createKeyframeStyles = (selectedElementID: string, style: string, value: string) => {
    const animationsCopy = [...animations];
    const elementToAnimate = animationsCopy.find((animation) => animation.name === selectedElementID);
    const keyframeToAddStyles = elementToAnimate?.keyframes.find(
      (keyframes) => keyframes.time === selectedKeyFrameTime,
    );

    // const styleFormattedForAnimation = style.split(':');
    // const styleProp = styleFormattedForAnimation[0];

    // if (keyframeToAddStyles && keyframeToAddStyles.styles.length) {
    //   const hasDuplicate = keyframeToAddStyles?.styles[0].includes(styleProp.toString());
    //   if (hasDuplicate) {
    //     const index = keyframeToAddStyles.styles.findIndex((style) => style.split(':')[0] === styleProp.toString());
    //     keyframeToAddStyles.styles.splice(index, 1);
    //     keyframeToAddStyles?.styles.push(`${style}: ${value}`);
    //   }
    // } else {
    //   keyframeToAddStyles?.styles.push(`${style}: ${value}`);
    // }

    keyframeToAddStyles?.styles.push(`${style}: ${value}`);
  };

  return (
    <AnimationsContext.Provider
      value={{
        animations,
        createNewAnimation,
        createKeyframe,
        selectedKeyFrameTime,
        setSelectedKeyFrameTime,
        createKeyframeStyles,
      }}
    >
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
