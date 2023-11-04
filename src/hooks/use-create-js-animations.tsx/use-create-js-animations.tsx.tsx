import { useEffect, useState } from 'react';
import { useAnimationsContext } from '../../state/animations';

interface StyleObjectKeys {
  [key: string]: string | number | null | undefined;
}

interface StyleObject extends StyleObjectKeys {
  opacity?: string | null;
  rotate?: string | null;
  translateX?: string | null;
  translateY?: string | null;
  offset: number;
  fill?: string;
}

interface FormattedStyleObject extends StyleObjectKeys {
  opacity?: string | null;
  transform?: string | null;
  offset: number;
  fill?: string;
}

const useCreateJSAnimations = () => {
  const { animations } = useAnimationsContext();
  const [animationsToPay, setAnimationsToPay] = useState<(Animation | undefined)[]>([]);

  useEffect(() => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);
        // const javascriptFormattedAnimations: Keyframe[] = [];
        const javascriptFormattedAnimations: FormattedStyleObject[] = [];

        animation.keyframes.forEach(({ styles, time }) => {
          const animationStyleObject: StyleObject = {
            opacity: null,
            rotate: null,
            translateX: null,
            translateY: null,
            offset: Number(time),
            fill: '',
          };

          for (const [key, value] of Object.entries(styles)) {
            if (value !== null && value !== '') {
              if (key === 'translateX' || key === 'translateY') {
                animationStyleObject[key] = `${key}(${value}px)`;
              } else if (key === 'rotate') {
                animationStyleObject[key] = `${key}(${value}deg)`;
              } else {
                animationStyleObject[key] = value;
              }
            }
          }
          javascriptFormattedAnimations.push(animationStyleObject);
        });

        const formatTransform = javascriptFormattedAnimations.map(
          ({ opacity, rotate, translateX, translateY, offset, fill }) => {
            return {
              opacity: opacity ? opacity : '1',
              transform: `${rotate ? rotate : ''} ${translateX ? translateX : ''} ${translateY ? translateY : ''}`,
              offset: offset,
              fill: fill,
            };
          },
        );

        const elementAnimation = elementToAnimate?.animate(formatTransform, {
          duration: 2500,
          fill: 'auto',
          easing: 'ease-in-out',
          iterations: 1,
        });

        elementAnimation?.finish();

        setAnimationsToPay((prevAnimations) => [...prevAnimations, elementAnimation]);
      });
    }
  }, [animations]);

  return animationsToPay;
};

export { useCreateJSAnimations };
