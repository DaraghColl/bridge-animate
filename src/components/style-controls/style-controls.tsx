import { FC, ChangeEvent, Fragment, useEffect, useState, useCallback } from 'react';
import { Style, StyleType, useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';
import { usePrevious } from '../../hooks/use-previous/use-previous';

const getElementPathLength = (path: SVGPathElement) => {
  return path.getTotalLength();
};

const Controls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime, animations } = useAnimationsContext();
  const previousSelectedElementId = usePrevious(selectedElementID);
  const [currentKeyframeStyles, setCurrentKeyframeStyles] = useState<Style>({});
  const [currentKeyframe, setCurrentKeyframe] = useState<Style>({});

  // set temporary styles so user can have real time feedback of style changes at keyframe point
  const updateSelectedElementTemporaryStyles = useCallback(() => {
    if (selectedElementID) {
      const selectedElement = document.getElementById(selectedElementID);
      if (selectedElement && currentKeyframe) {
        const transformArray = [
          `${currentKeyframe.translateX !== '' ? `translateX(${currentKeyframe.translateX}px)` : ''}`,
          `${currentKeyframe.translateY !== '' ? `translateY(${currentKeyframe.translateY}px)` : ''}`,
          `${currentKeyframe.rotate !== '' ? `rotate(${currentKeyframe.rotate}deg)` : ''}`,
          `${currentKeyframe.scale !== '' ? `scale(${currentKeyframe.scale})` : ''}`,
        ];

        if (currentKeyframe.opacity) selectedElement.style.opacity = currentKeyframe.opacity;
        if (currentKeyframe.fill) selectedElement.style.fill = currentKeyframe.fill;
        if (currentKeyframe.stroke) selectedElement.style.stroke = currentKeyframe.stroke;
        if (currentKeyframe.strokeDasharray) selectedElement.style.strokeDasharray = currentKeyframe.strokeDasharray;
        if (currentKeyframe.strokeDashoffset) selectedElement.style.strokeDashoffset = currentKeyframe.strokeDashoffset;
        if (transformArray) selectedElement.style.transform = transformArray.join(' ');
      }
    }
  }, [currentKeyframe, selectedElementID]);

  const handleInputChange = (style: StyleType, e: ChangeEvent<HTMLInputElement>) => {
    const elementNameAttribute = e.target.getAttribute('name');
    if (!selectedElementID) return;

    let styleValue = e.target.value;

    if (style === 'strokeDasharray') {
      const pathElement = document.getElementById(selectedElementID)!;
      if (pathElement.nodeName !== 'path') return;
      const pathLength = getElementPathLength(pathElement as unknown as SVGPathElement);

      styleValue = pathLength.toString();

      createKeyframeStyles(selectedElementID, style, styleValue);
      createKeyframeStyles(
        selectedElementID,
        'strokeDashoffset',

        elementNameAttribute === 'stroke-dash-start' ? styleValue : '0',
      );

      updateSelectedElementTemporaryStyles();

      setCurrentKeyframeStyles({ ...currentKeyframeStyles, strokeDasharray: pathLength.toString() });
      setCurrentKeyframeStyles({ ...currentKeyframeStyles, strokeDashoffset: pathLength.toString() });

      return;
    }

    createKeyframeStyles(selectedElementID, style, e.target.value);

    updateSelectedElementTemporaryStyles();

    setCurrentKeyframeStyles({ ...currentKeyframeStyles, [style]: e.target.value });
  };

  // set the current frames object
  useEffect(() => {
    const currentKeyframe = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyframe) return;

    setCurrentKeyframe(currentKeyframe);
  }, [animations, selectedElementID, selectedKeyFrameTime]);

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

  // set keyframe styles
  useEffect(() => {
    if (animations && animations?.length <= 0) return;

    const currentKeyframe = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyframe) return;

    setCurrentKeyframeStyles(currentKeyframe);
  }, [selectedElementID, animations, selectedKeyFrameTime]);

  return (
    <div className="flex flex-col gap-4 p-4 text-sm font-normal">
      {(selectedElementID === null || !selectedKeyFrameTime) && (
        <span className="text-sm tracking-wide">
          Select Element, add an animation layer, and select keyframe to see controls
        </span>
      )}
      {selectedElementID && selectedKeyFrameTime && (
        <Fragment>
          <div className="flex flex-col border-b-2 border-gray-100 pb-4">
            <label htmlFor="opacity" className="mb-2">
              opacity
            </label>
            <input
              name="opacity"
              type="number"
              className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:dark:text-gray-100"
              onBlur={(e) => handleInputChange('opacity', e)}
              onChange={(e) => handleInputChange('opacity', e)}
              value={currentKeyframeStyles.opacity}
            />
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-slate-100 pb-4">
            <span>position</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/2">
                <label htmlFor="xPosition" className="ml-2 text-slate-500">
                  x
                </label>
                <input
                  name="xPosition"
                  type="number"
                  className="w-full rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('translateX', e)}
                  onChange={(e) => handleInputChange('translateX', e)}
                  value={currentKeyframeStyles.translateX}
                />
              </div>
              <div className="basis-1/2">
                <label htmlFor="yPosition" className="ml-2 text-slate-500">
                  y
                </label>
                <input
                  name="yPosition"
                  type="number"
                  className="w-full rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('translateY', e)}
                  onChange={(e) => handleInputChange('translateY', e)}
                  value={currentKeyframeStyles.translateY}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="rotate" className="ml-2 text-slate-500">
                rotate
              </label>
              <input
                name="rotate"
                type="number"
                className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                onBlur={(e) => handleInputChange('rotate', e)}
                onChange={(e) => handleInputChange('rotate', e)}
                value={currentKeyframeStyles.rotate}
              />
            </div>
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-slate-100 pb-4">
            <span>scale</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/2">
                <label htmlFor="xPosition" className="ml-2 text-slate-500">
                  all
                </label>
                <input
                  name="xPosition"
                  type="number"
                  className="w-full rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onBlur={(e) => handleInputChange('scale', e)}
                  onChange={(e) => handleInputChange('scale', e)}
                  value={currentKeyframeStyles.scale}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col border-b-2 border-slate-100 pb-4">
            <span>color</span>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label htmlFor="rotate" className="ml-2 text-slate-500">
                  fill
                </label>
                <input
                  name="fill"
                  type="color"
                  className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('fill', e)}
                  value={currentKeyframeStyles.fill}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="rotate" className="ml-2 text-slate-500">
                  stroke
                </label>

                <input
                  name="stroke"
                  type="color"
                  className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('stroke', e)}
                  value={currentKeyframeStyles.stroke}
                />
              </div>
            </div>
          </div>

          <div className="mb-2 flex flex-col border-b-2 border-slate-100 pb-4">
            <span>stroke path</span>
            <div className="mt-2 flex gap-8">
              <div className="flex flex-col">
                <label htmlFor="stroke-dash" className="ml-2 text-slate-500">
                  start
                </label>

                <input
                  name="stroke-dash-start"
                  type="checkbox"
                  className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('strokeDasharray', e)}
                  value={currentKeyframeStyles.strokeDasharray}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stroke-dash" className="ml-2 text-slate-500">
                  end
                </label>

                <input
                  name="stroke-dash-end"
                  type="checkbox"
                  className="rounded-sm bg-slate-50 px-2  py-1 text-black outline-none dark:bg-dark-primary dark:text-gray-100"
                  onChange={(e) => handleInputChange('strokeDasharray', e)}
                  value={currentKeyframeStyles.strokeDasharray}
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { Controls };
