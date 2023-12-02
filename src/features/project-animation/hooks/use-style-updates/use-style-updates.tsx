import { Style } from '../../state/animations/animations';
import { formatTransformAndScale } from '../../utils/format-animation/format-animaton';

const useStyleUpdates = () => {
  const updateSelectedElementTemporaryStyles = (element: HTMLElement, keyframe: Style) => {
    if (element && keyframe) {
      if (keyframe.opacity) element.style.opacity = keyframe.opacity;
      if (keyframe.rotate) element.style.rotate = `${keyframe.rotate}deg`;
      if (keyframe.scale) element.style.scale = keyframe.scale;
      if (keyframe.fill) element.style.fill = keyframe.fill;
      if (keyframe.stroke) element.style.stroke = keyframe.stroke;
      if (keyframe.strokeDasharray) element.style.strokeDasharray = keyframe.strokeDasharray;
      if (keyframe.strokeDashoffset) element.style.strokeDashoffset = keyframe.strokeDashoffset;

      const { translate, scale } = formatTransformAndScale(
        keyframe.translateX,
        keyframe.translateY,
        keyframe.scale,
        keyframe.scaleX,
        keyframe.scaleY,
      );

      if (translate && translate.length > 0) element.style.translate = translate;
      if (scale && scale.length > 0) element.style.scale = scale;
    }
  };

  const removeElementStyles = (element: HTMLElement, previousElement: HTMLElement | null) => {
    element.removeAttribute('style');

    if (previousElement && previousElement !== element) {
      previousElement.removeAttribute('style');
    }
  };

  return { updateSelectedElementTemporaryStyles, removeElementStyles };
};

export { useStyleUpdates };
