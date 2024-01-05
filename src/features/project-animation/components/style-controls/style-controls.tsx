import { FC, ChangeEvent, Fragment, useEffect, useState } from 'react';
import { SwatchIcon } from '@heroicons/react/24/outline';
import { Style, StyleType, useAnimationsContext } from '../../state/animations/animations';
import { useSelectedElementContext } from '../../state/selected-element/selected-element';
import { usePrevious } from '@shared/hooks/use-previous/use-previous';
import { useStyleUpdates } from '../../hooks/use-style-updates/use-style-updates';

const StyleControls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime, animations } = useAnimationsContext();
  const { updateSelectedElementTemporaryStyles, removeElementStyles } = useStyleUpdates();
  const previousSelectedElementId = usePrevious(selectedElementID);
  const [currentKeyframe, setCurrentKeyframe] = useState<Style>({});

  const handleInputChange = (style: StyleType, e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedElementID) return;
    const selectedElement = document.getElementById(selectedElementID);
    if (!selectedElement) return;

    selectedElement.removeAttribute('style');

    createKeyframeStyles(selectedElementID, style, e.target.value);
    setCurrentKeyframe({ ...currentKeyframe, [style]: e.target.value });
    if (selectedElement) {
      updateSelectedElementTemporaryStyles(selectedElement, currentKeyframe);
    }
  };

  // set selected element temporary styles
  // reset previous styles when element changes
  useEffect(() => {
    if (!selectedElementID) return;
    const selectedElement = document.getElementById(selectedElementID);
    const previousSelectedElement = previousSelectedElementId
      ? document.getElementById(previousSelectedElementId)
      : null;

    if (!selectedElement) return;

    removeElementStyles(selectedElement, previousSelectedElement);
    updateSelectedElementTemporaryStyles(selectedElement, currentKeyframe);
  }, [
    currentKeyframe,
    previousSelectedElementId,
    selectedElementID,
    removeElementStyles,
    updateSelectedElementTemporaryStyles,
  ]);

  // set current keyframe
  useEffect(() => {
    if (animations && animations?.length <= 0) return;

    const currentKeyframe = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyframe) return;

    setCurrentKeyframe(currentKeyframe);
  }, [selectedElementID, animations, selectedKeyFrameTime]);

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

      {!selectedElementID || (!selectedKeyFrameTime && <p>Select keyframe to change styles</p>)}
    </div>
  );
};

export { StyleControls };
