import { FC, ChangeEvent, Fragment, useEffect, useState, useCallback } from 'react';
import { SwatchIcon } from '@heroicons/react/24/outline';
import { Style, StyleType, useAnimationsContext } from '@/features/project-animation/state/animations';
import { useSelectedElementContext } from '@/features/project-animation/state/selected-element';
import { usePrevious } from '@/features/project-animation/hooks/use-previous/use-previous';
import { formatTransformAndScale } from '@/features/project-animation/utils/format-animation/format-animaton';

const StyleControls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime, animations } = useAnimationsContext();
  const previousSelectedElementId = usePrevious(selectedElementID);
  const [currentKeyframe, setCurrentKeyframe] = useState<Style>({});

  // set temporary styles so user can have real time feedback of style changes at keyframe point
  const updateSelectedElementTemporaryStyles = useCallback(() => {
    if (selectedElementID && selectedKeyFrameTime) {
      const selectedElement = document.getElementById(selectedElementID);
      if (selectedElement && currentKeyframe) {
        if (currentKeyframe.opacity) selectedElement.style.opacity = currentKeyframe.opacity;
        if (currentKeyframe.rotate) selectedElement.style.rotate = `${currentKeyframe.rotate}deg`;
        if (currentKeyframe.scale) selectedElement.style.scale = currentKeyframe.scale;
        if (currentKeyframe.fill) selectedElement.style.fill = currentKeyframe.fill;
        if (currentKeyframe.stroke) selectedElement.style.stroke = currentKeyframe.stroke;
        if (currentKeyframe.strokeDasharray) selectedElement.style.strokeDasharray = currentKeyframe.strokeDasharray;
        if (currentKeyframe.strokeDashoffset) selectedElement.style.strokeDashoffset = currentKeyframe.strokeDashoffset;

        const { translate, scale } = formatTransformAndScale(
          currentKeyframe.translateX,
          currentKeyframe.translateY,
          currentKeyframe.scale,
          currentKeyframe.scaleX,
          currentKeyframe.scaleY,
        );

        if (translate && translate.length > 0) selectedElement.style.translate = translate;
        if (scale && scale.length > 0) selectedElement.style.scale = scale;
      }
    }
  }, [currentKeyframe, selectedElementID, selectedKeyFrameTime]);

  const handleInputChange = (style: StyleType, e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedElementID) return;

    createKeyframeStyles(selectedElementID, style, e.target.value);
    setCurrentKeyframe({ ...currentKeyframe, [style]: e.target.value });
    updateSelectedElementTemporaryStyles();
  };

  // set selected element temporary styles
  // reset previous styles when element changes
  useEffect(() => {
    if (selectedElementID) {
      const selectedElement = document.getElementById(selectedElementID);

      if (selectedElement) {
        selectedElement.removeAttribute('style');
      }

      if (previousSelectedElementId && previousSelectedElementId !== selectedElementID) {
        const previousSelectedElement = document.getElementById(previousSelectedElementId);
        if (!previousSelectedElement) return;
        previousSelectedElement.removeAttribute('style');
      }

      updateSelectedElementTemporaryStyles();
    }
  }, [previousSelectedElementId, selectedElementID, updateSelectedElementTemporaryStyles]);

  // set current keyframe
  useEffect(() => {
    if (animations && animations?.length <= 0) return;

    const currentKeyframe = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyframe) return;

    setCurrentKeyframe(currentKeyframe);
  }, [selectedElementID, animations, selectedKeyFrameTime]);

  // this effect is specically for the transform tool - to change temp styles on update
  useEffect(() => {
    updateSelectedElementTemporaryStyles();
  }, [
    currentKeyframe.rotate,
    currentKeyframe.scale,
    currentKeyframe.translateX,
    currentKeyframe.translateY,
    updateSelectedElementTemporaryStyles,
  ]);

  return (
    <div className="flex min-h-0 flex-col gap-4 p-4 text-sm font-normal">
      <div className="flex items-center gap-2">
        <SwatchIcon className="h-4 w-4" />
        <span>Styles</span>
      </div>
      {selectedElementID && selectedKeyFrameTime && (
        <Fragment>
          <div className="flex flex-col border-b-2 border-gray-100 pb-4">
            <label htmlFor="opacity" className="mb-2">
              opacity
            </label>
            <input
              name="opacity"
              type="number"
              className="rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:dark:text-gray-100"
              onBlur={(e) => handleInputChange('opacity', e)}
              onChange={(e) => handleInputChange('opacity', e)}
              value={currentKeyframe.opacity ? currentKeyframe.opacity : ''}
            />
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-light-secondary pb-4">
            <span>position</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/2">
                <label htmlFor="xPosition" className="text-slate-medium">
                  x
                </label>
                <input
                  name="xPosition"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('translateX', e)}
                  onChange={(e) => handleInputChange('translateX', e)}
                  value={currentKeyframe.translateX ? currentKeyframe.translateX : ''}
                />
              </div>
              <div className="basis-1/2">
                <label htmlFor="yPosition" className="text-slate-medium">
                  y
                </label>
                <input
                  name="yPosition"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('translateY', e)}
                  onChange={(e) => handleInputChange('translateY', e)}
                  value={currentKeyframe.translateY ? currentKeyframe.translateY : ''}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="rotate" className="text-slate-medium">
                rotate
              </label>
              <input
                name="rotate"
                type="number"
                className="rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                onBlur={(e) => handleInputChange('rotate', e)}
                onChange={(e) => handleInputChange('rotate', e)}
                value={currentKeyframe.rotate ? currentKeyframe.rotate : ''}
              />
            </div>
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-light-secondary pb-4">
            <span>scale</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/3">
                <label htmlFor="scale" className="text-slate-medium">
                  all
                </label>
                <input
                  name="scale"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('scale', e)}
                  onChange={(e) => handleInputChange('scale', e)}
                  value={currentKeyframe.scale ? currentKeyframe.scale : ''}
                  disabled={
                    !!(currentKeyframe.scaleX || currentKeyframe.scaleX !== '') ||
                    !!(currentKeyframe.scaleY || currentKeyframe.scaleY !== '')
                  }
                />
              </div>
              <div className="basis-1/3">
                <label htmlFor="scaleX" className="text-slate-medium">
                  x
                </label>
                <input
                  name="scaleX"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('scaleX', e)}
                  onChange={(e) => handleInputChange('scaleX', e)}
                  value={currentKeyframe.scaleX ? currentKeyframe.scaleX : ''}
                  disabled={!!(currentKeyframe.scale || currentKeyframe.scale !== '')}
                />
              </div>
              <div className="basis-1/3">
                <label htmlFor="scaleY" className="text-slate-medium">
                  y
                </label>
                <input
                  name="scaleY"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('scaleY', e)}
                  onChange={(e) => handleInputChange('scaleY', e)}
                  value={currentKeyframe.scaleY ? currentKeyframe.scaleY : ''}
                  disabled={!!(currentKeyframe.scale || currentKeyframe.scale !== '')}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col border-b-2 border-light-secondary pb-4">
            <span>color</span>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label htmlFor="rotate" className="text-slate-medium">
                  fill
                </label>
                <input
                  name="fill"
                  type="color"
                  className="rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('fill', e)}
                  value={currentKeyframe.fill ? currentKeyframe.fill : '#000000'}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="rotate" className="text-slate-medium">
                  stroke
                </label>

                <input
                  name="stroke"
                  type="color"
                  className="rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('stroke', e)}
                  value={currentKeyframe.stroke ? currentKeyframe.stroke : '#000000'}
                />
              </div>
            </div>
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-light-secondary pb-4">
            <span>stroke</span>
            <div className="mt-2 flex gap-2">
              <div className="flex basis-1/2 flex-col">
                <label htmlFor="stroke-dash" className="text-slate-medium">
                  dash
                </label>
                <input
                  name="stroke-dash"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('strokeDasharray', e)}
                  onChange={(e) => handleInputChange('strokeDasharray', e)}
                  value={currentKeyframe.strokeDasharray ? currentKeyframe.strokeDasharray : ''}
                />
              </div>
              <div className="flex basis-1/2 flex-col">
                <label htmlFor="stroke-offset" className="text-slate-medium">
                  offset
                </label>

                <input
                  name="stroke-offset"
                  type="number"
                  className="w-full rounded-sm bg-light-secondary px-2  py-1 text-dark-primary outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('strokeDashoffset', e)}
                  onChange={(e) => handleInputChange('strokeDashoffset', e)}
                  value={currentKeyframe.strokeDashoffset ? currentKeyframe.strokeDashoffset : ''}
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { StyleControls };
