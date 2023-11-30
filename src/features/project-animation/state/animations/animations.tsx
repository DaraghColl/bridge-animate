import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type StyleType =
  | 'opacity'
  | 'rotate'
  | 'translateX'
  | 'translateY'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
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
  scaleX?: string;
  scaleY?: string;
  fill?: string;
  stroke?: string;
  strokeDasharray?: string;
  strokeDashoffset?: string;
};

export type KeyframeTime = '0' | '0.25' | '0.50' | '0.75' | '1';

export interface Keyframe {
  time: KeyframeTime;
  styles: Style;
}

export type AnimationConfigProperties =
  | 'animationName'
  | 'animationDuration'
  | 'animationDelay'
  | 'animationInterationCount'
  | 'animationDirection'
  | 'animationTimingFunction'
  | 'animationFillMode';

interface StyleObjectKeys {
  [key: string]: string | number | null | undefined;
}
export interface AnimationConfig extends StyleObjectKeys {
  animationName: string;
  animationDuration: string;
  animationDelay: string;
  animationInterationCount: string;
  animationDirection: PlaybackDirection;
  animationTimingFunction: string;
  animationFillMode: FillMode;
}

export interface Animation {
  id: string;
  name: string;
  config: AnimationConfig;
  keyframes: Keyframe[];
}

interface AnimationsValue {
  animations: Animation[] | null;
  setAnimations: Dispatch<SetStateAction<Animation[] | []>>;
  createNewAnimation: (elementId: string) => void;
  deleteAnimation: (animationID: string) => void;
  createKeyframe: (animationName: string, keyframeTime: KeyframeTime) => void;
  deleteKeyframe: (animationName: string, keyframeTime: KeyframeTime) => void;
  selectedKeyFrameTime: KeyframeTime | null;
  setSelectedKeyFrameTime: Dispatch<SetStateAction<KeyframeTime | null>>;
  createKeyframeStyles: (selectedElementID: string, style: StyleType, value: string) => void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  updateAnimationConfig: (selectedElementID: string, configProperty: AnimationConfigProperties, value: string) => void;
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
      throw new Error('could not find aninmation for this element');
    }

    const newAnimation: Animation = {
      id: uuidv4(),
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

  const deleteAnimation = (animationID: string) => {
    const animationsCopy = [...animations];

    const index = animationsCopy.findIndex((animation) => animation.id === animationID);

    if (index === -1) {
      throw new Error('Animation Index not found');
    }

    animationsCopy.splice(index, 1);

    setAnimations(animationsCopy);
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
        scaleX: '',
        scaleY: '',
        fill: '',
        stroke: '',
        strokeDasharray: '',
        strokeDashoffset: '',
      },
    };

    const animationsCopy = [...animations];
    animationsCopy.forEach((animation) => {
      if (animation.name === animationName) {
        animation.keyframes.push(keyframe);
        setSelectedKeyFrameTime(keyframe.time);
      }

      // sort keyframes by time ascending
      // animate() will give error if keyframes not in correct order
      animation.keyframes.sort((a, b) => Number(a.time) - Number(b.time));
    });

    setAnimations(animationsCopy);
  };

  const deleteKeyframe = (animationName: string, keyframeTime: KeyframeTime) => {
    const animationsCopy = [...animations];
    const animationIndex = animations.findIndex((animation) => (animation.name = animationName));

    if (animationIndex === -1) {
      throw new Error('Keyframe Index not found');
    }

    const keyframeIndex = animationsCopy[animationIndex].keyframes.findIndex(
      (keyframe) => keyframe.time === keyframeTime,
    );

    animations[animationIndex].keyframes.splice(keyframeIndex, 1);
    animations[animationIndex].keyframes.sort((a, b) => Number(a.time) - Number(b.time));

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

  const updateAnimationConfig = (
    selectedElementID: string,
    configProperty: AnimationConfigProperties,
    value: string,
  ) => {
    const selected = animations.findIndex((animation) => animation.name === selectedElementID);
    if (selected === -1) return;

    const animationsCopy = [...animations];
    animationsCopy[selected].config[configProperty.toString()] = value;

    setAnimations(animationsCopy);
  };

  return (
    <AnimationsContext.Provider
      value={{
        animations,
        setAnimations,
        createNewAnimation,
        deleteAnimation,
        createKeyframe,
        deleteKeyframe,
        selectedKeyFrameTime,
        setSelectedKeyFrameTime,
        createKeyframeStyles,
        isPlaying,
        setIsPlaying,
        updateAnimationConfig,
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
