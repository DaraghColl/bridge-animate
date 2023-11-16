import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

export type StyleType =
  | 'opacity'
  | 'rotate'
  | 'translateX'
  | 'translateY'
  | 'scale'
  | 'fill'
  | 'stroke'
  | 'strokeDasharray'
  | 'strokeDashoffset';

export type Style = {
  opacity?: string;
  rotate?: string;
  translateX?: string;
  translateY?: string;
  scale?: string;
  fill?: string;
  stroke?: string;
  strokeDasharray?: string;
  strokeDashoffset?: string;
};

export type KeyframeTime = '0' | '0.25' | '0.50' | '0.75' | '1';

interface Keyframe {
  time: KeyframeTime;
  styles: Style;
}

interface AnimationConfigPoperties {
  animationName: string;
  animationDuration: string;
  animationDelay: string;
  animationInterationCount: string;
  animationDirection: PlaybackDirection;
  animationTimingFunction: string;
  animationFillMode: FillMode;
}

export interface Animation {
  name: string;
  config: AnimationConfigPoperties;
  keyframes: Keyframe[];
}

interface AnimationsValue {
  animations: Animation[] | null;
  setAnimations: Dispatch<SetStateAction<Animation[] | []>>;
  createNewAnimation: (elementId: string) => void;
  createKeyframe: (animationName: string, keyframeTime: KeyframeTime) => void;
  selectedKeyFrameTime: KeyframeTime | null;
  setSelectedKeyFrameTime: Dispatch<SetStateAction<KeyframeTime | null>>;
  createKeyframeStyles: (selectedElementID: string, style: StyleType, value: string) => void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const AnimationsContext = createContext<AnimationsValue | undefined>(undefined);

interface AnimationsProviderProps {
  children: ReactNode;
}

const AnimationsProvider: FC<AnimationsProviderProps> = ({ children }) => {
  const [animations, setAnimations] = useState<Animation[] | []>([]);
  const [selectedKeyFrameTime, setSelectedKeyFrameTime] = useState<KeyframeTime | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const createNewAnimation = (elementId: string) => {
    if (animations.some((animation) => animation.name === elementId)) {
      return;
    }

    const newAnimation: Animation = {
      name: elementId,
      config: {
        animationName: elementId,
        animationDuration: '2.5',
        animationDelay: '0',
        animationInterationCount: '1',
        animationDirection: 'normal',
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'forwards',
      },
      keyframes: [],
    };

    setAnimations([...animations, newAnimation]);
  };

  const createKeyframe = (animationName: string, keyframeTime: KeyframeTime) => {
    const keyframe: Keyframe = {
      time: keyframeTime,
      styles: {
        opacity: '',
        rotate: '',
        translateX: '',
        translateY: '',
        scale: '',
        fill: '',
        stroke: '',
        strokeDasharray: '',
        strokeDashoffset: '',
      },
    };

    const animationsCopy = [...animations];
    animationsCopy.forEach((animation) => {
      if (animation.name === animationName) {
        // delete keyframe if already exists
        // action comes from the same action as create keyframe (double click on keyframe time)
        if (animation.keyframes && animation.keyframes.find((keyframe) => keyframe.time === keyframeTime)) {
          const index = animation.keyframes.findIndex((keyframe) => keyframe.time === keyframeTime);
          animation.keyframes.splice(index, 1);
        } else {
          animation.keyframes.push(keyframe);
          setSelectedKeyFrameTime(keyframe.time);
        }
      }

      // sort keyframes by time ascending
      // animate() will give error if keyframes not in correct order
      animation.keyframes.sort((a, b) => Number(a.time) - Number(b.time));
    });

    setAnimations(animationsCopy);
  };

  const createKeyframeStyles = (selectedElementID: string, style: StyleType, value: string) => {
    const animationsCopy = [...animations];
    const elementToAnimate = animationsCopy.find((animation) => animation.name === selectedElementID);
    const keyframeToAddStyles = elementToAnimate?.keyframes.find(
      (keyframes) => keyframes.time === selectedKeyFrameTime,
    );

    if (style && keyframeToAddStyles) {
      keyframeToAddStyles.styles[style] = value;
    }

    setAnimations(animationsCopy);
  };

  return (
    <AnimationsContext.Provider
      value={{
        animations,
        setAnimations,
        createNewAnimation,
        createKeyframe,
        selectedKeyFrameTime,
        setSelectedKeyFrameTime,
        createKeyframeStyles,
        isPlaying,
        setIsPlaying,
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
