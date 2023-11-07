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
  const [currentKeyframeStyles, setCurrentKeyframeStyles] = useState<Style>({
    opacity: '',
    rotate: '',
    translateX: '',
    translateY: '',
    fill: '',
    stroke: '',
  });

  // set temporary styles so user can have real time feedback of style changes at keyframe point
  const updateSelectedElementTemporaryStyles = useCallback(() => {
    const currentKeyFrame = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (selectedElementID) {
      const selectedElement = document.getElementById(selectedElementID);
      if (selectedElement && currentKeyFrame) {
        const transformArray = [
          `${currentKeyFrame.translateX !== '' ? `translateX(${currentKeyFrame.translateX}px)` : ''}`,
          `${currentKeyFrame.translateY !== '' ? `translateY(${currentKeyFrame.translateY}px)` : ''}`,
          `${currentKeyFrame.rotate !== '' ? `rotate(${currentKeyFrame.rotate}deg)` : ''}`,
        ];

        if (currentKeyFrame.opacity) selectedElement.style.opacity = currentKeyFrame.opacity;
        if (currentKeyFrame.fill) selectedElement.style.fill = currentKeyFrame.fill;
        if (currentKeyFrame.stroke) selectedElement.style.stroke = currentKeyFrame.stroke;
        if (currentKeyFrame.strokeDasharray) selectedElement.style.strokeDasharray = currentKeyFrame.strokeDasharray;
        if (currentKeyFrame.strokeDashoffset) selectedElement.style.strokeDashoffset = currentKeyFrame.strokeDashoffset;
        if (transformArray) selectedElement.style.transform = transformArray.join(' ');
      }
    }
  }, [animations, selectedElementID, selectedKeyFrameTime]);

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

    const currentKeyFrame = animations
      ?.find((animation) => animation.name === selectedElementID)
      ?.keyframes.find((keyframe) => keyframe.time === selectedKeyFrameTime)?.styles;

    if (!currentKeyFrame) return;

    setCurrentKeyframeStyles(currentKeyFrame);
  }, [selectedElementID, animations, selectedKeyFrameTime]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {(selectedElementID === null || !selectedKeyFrameTime) && (
        <span className="text-sm tracking-wide">
          Select Element, add an animation layer, and select keyframe to see controls
        </span>
      )}
      {selectedElementID && selectedKeyFrameTime && (
        <Fragment>
          <div className="flex flex-col">
            <label htmlFor="opacity" className="mb-2 text-gray-100">
              opacity
            </label>
            <input
              name="opacity"
              type="number"
              className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
              onBlur={(e) => handleInputChange('opacity', e)}
              onChange={(e) => handleInputChange('opacity', e)}
              value={currentKeyframeStyles.opacity}
            />
          </div>

          <div className="mb-2 flex flex-col">
            <span>position</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/2">
                <label htmlFor="xPosition" className="ml-2 text-slate-200">
                  x
                </label>
                <input
                  name="xPosition"
                  type="number"
                  className="w-full rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onBlur={(e) => handleInputChange('translateX', e)}
                  onChange={(e) => handleInputChange('translateX', e)}
                  value={currentKeyframeStyles.translateX}
                />
              </div>
              <div className="basis-1/2">
                <label htmlFor="yPosition" className="ml-2 text-slate-200">
                  y
                </label>
                <input
                  name="yPosition"
                  type="number"
                  className="w-full rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onBlur={(e) => handleInputChange('translateY', e)}
                  onChange={(e) => handleInputChange('translateY', e)}
                  value={currentKeyframeStyles.translateY}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="rotate" className="ml-2 text-slate-200">
                rotate
              </label>
              <input
                name="rotate"
                type="number"
                className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                onBlur={(e) => handleInputChange('rotate', e)}
                onChange={(e) => handleInputChange('rotate', e)}
                value={currentKeyframeStyles.rotate}
              />
            </div>
          </div>

          <div>
            <span>color</span>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label htmlFor="rotate" className="ml-2 text-slate-200">
                  fill
                </label>
                <input
                  name="fill"
                  type="color"
                  className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onChange={(e) => handleInputChange('fill', e)}
                  value={currentKeyframeStyles.fill}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="rotate" className="ml-2 text-slate-200">
                  stroke
                </label>

                <input
                  name="stroke"
                  type="color"
                  className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onChange={(e) => handleInputChange('stroke', e)}
                  value={currentKeyframeStyles.stroke}
                />
              </div>
            </div>
          </div>
          <div>
            <span>stroke path</span>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <label htmlFor="stroke-dash" className="ml-2 text-slate-200">
                  start
                </label>

                <input
                  name="stroke-dash-start"
                  type="checkbox"
                  className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onChange={(e) => handleInputChange('strokeDasharray', e)}
                  value={currentKeyframeStyles.strokeDasharray}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stroke-dash" className="ml-2 text-slate-200">
                  end
                </label>

                <input
                  name="stroke-dash-end"
                  type="checkbox"
                  className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
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
