import { useEffect, useState } from 'react';
import { useAnimationsContext } from '../../state/animations';
import { formatTransformAndScale } from '../../utils/format-animation/format-animaton';

interface StyleObjectKeys {
  [key: string]: string | number | null | undefined;
}

interface StyleObject extends StyleObjectKeys {
  offset: number;
  opacity?: string | null;
  rotate?: string | null;
  translateX?: string | null;
  translateY?: string | null;
  scale?: string;
  scaleX?: string;
  scaleY?: string;
  fill?: string | null;
  stroke?: string | null;
  strokeDasharray?: string | null;
  strokeDashoffset?: string | null;
}

interface FormattedStyleObject extends StyleObject {
  transform?: string | null;
  translate?: string | null;
}

const formatAnimationStyles = (javascriptFormattedAnimations: StyleObject[]) => {
  return javascriptFormattedAnimations.map((animation) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { scaleX, scaleY, translateX, translateY, ...rest } = animation;

    const formattedAnimationObject: FormattedStyleObject = rest;

    const { translate, scale } = formatTransformAndScale(
      animation.translateX,
      animation.translateY,
      animation.scale,
      animation.scaleX,
      animation.scaleY,
    );

    if (translate) formattedAnimationObject.translate = translate;
    if (scale) formattedAnimationObject.scale = scale;

    return formattedAnimationObject;
  });
};

const useCreateJSAnimations = () => {
  const { animations } = useAnimationsContext();
  const [formattedJSAnimations, setFormattedJSAnimations] = useState<StyleObject[] | []>([]);
  const [animationsToPay, setAnimationsToPay] = useState<Animation[] | []>([]);
  const [jsAnimations, setJsAnimations] = useState<string[]>([]);
  const [cssAnimations, setCSSAnimations] = useState<string[]>([]);

  useEffect(() => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);
        const javascriptFormattedAnimations: StyleObject[] = [];

        animation.keyframes.forEach(({ styles, time }) => {
          const animationStyleObject: StyleObject = {
            offset: Number(time),
          };

          for (const [key, value] of Object.entries(styles)) {
            if (value !== null && value !== '') {
              if (key === 'translateX' || key === 'translateY') {
                animationStyleObject[key] = value;
              } else if (key === 'rotate') {
                animationStyleObject[key] = `${value}deg`;
              } else if (key === 'scale') {
                animationStyleObject[key] = value;
              } else {
                animationStyleObject[key] = value;
              }
            }
          }
          javascriptFormattedAnimations.push(animationStyleObject);
          setFormattedJSAnimations(javascriptFormattedAnimations);
        });

        // set up object for the actual javascript animation API
        // need to group all transforms together as one string
        const animationWithFormattedTransform = formatAnimationStyles(javascriptFormattedAnimations);

        const keyframeEffect = new KeyframeEffect(elementToAnimate, animationWithFormattedTransform, {
          duration: Number(animation.config.animationDuration) * 1000,
          fill: 'auto',
          easing: 'ease-in-out',
          iterations: 1,
        });

        const elementAnimation = new Animation(keyframeEffect, document.timeline);

        setAnimationsToPay((prevAnimations) => [...prevAnimations, elementAnimation]);
      });
    }
  }, [animations]);

  const clearGeneratedAnimationCode = () => {
    setJsAnimations([]);
    setCSSAnimations([]);
  };

  const generateCSSAnimations = () => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);

        // set up object for the actual javascript animation API
        // need to group all transforms together as one string
        const animationWithFormattedTransform = formatAnimationStyles(formattedJSAnimations);

        const arrayOfCssKeyframes: string[] = [];

        animationWithFormattedTransform.forEach((keyframe) => {
          const { offset, ...restOfKeyframe } = keyframe;
          const keyframesString = `
            ${offset * 100}%
              ${JSON.stringify(restOfKeyframe)}
          `.replace(/["]/g, '');

          arrayOfCssKeyframes.push(keyframesString);
        });

        const keyframe = `
          @keyframes ${elementToAnimate?.getAttribute('id')}-animation {
            ${arrayOfCssKeyframes.join(' ')}
          }
        `;

        setCSSAnimations((prev) => [...prev, keyframe]);
      });
    }
  };

  const generateJSAnimations = async () => {
    if (animations) {
      // loop through all elements with animations
      animations.forEach((animation) => {
        const elementToAnimate = document.getElementById(animation.name);

        // set up object for the actual javascript animation API
        // need to group all transforms together as one string
        const animationWithFormattedTransform = formatAnimationStyles(formattedJSAnimations);

        const keyframe = `
        const ${elementToAnimate?.getAttribute('id')}-animation = ${elementToAnimate?.getAttribute('id')}
        .animate(
          ${JSON.stringify(animationWithFormattedTransform)},
          {
            duration: ${Number(animation.config.animationDuration) * 1000},
            fill: 'auto',
            easing: 'ease-in-out',
            iterations: 1,
          });`;

        setJsAnimations((prev) => [...prev, keyframe]);
      });
    }
  };

  return {
    animationsToPay,
    generateCSSAnimations,
    generateJSAnimations,
    jsAnimations,
    cssAnimations,
    clearGeneratedAnimationCode,
  };
};

export { useCreateJSAnimations };
