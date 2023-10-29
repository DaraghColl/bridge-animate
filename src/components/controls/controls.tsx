import { FC, ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Style, StyleType, useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';

const Controls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime, animations } = useAnimationsContext();
  const [currentKeyframeStyles, setCurrentKeyframeStyles] = useState<Style>({
    opacity: '',
    rotate: '',
    translateX: '',
    translateY: '',
  });

  const handleInputChange = (style: StyleType, e: ChangeEvent<HTMLInputElement>) => {
    if (selectedElementID) {
      createKeyframeStyles(selectedElementID, style, e.target.value);
    }

    setCurrentKeyframeStyles({ ...currentKeyframeStyles, [style]: e.target.value });
  };

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
      {(selectedElementID === null || !selectedKeyFrameTime) && <h1>Select Element to see controls</h1>}
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
              value={currentKeyframeStyles.opacity}
            />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Position</span>
            <div className="mt-2 flex flex-row gap-2">
              <div className="basis-1/2">
                <label htmlFor="xPosition" className="ml-2 text-indigo-500">
                  x
                </label>
                <input
                  name="xPosition"
                  type="number"
                  className="w-full rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onBlur={(e) => handleInputChange('translateX', e)}
                  value={currentKeyframeStyles.translateX}
                />
              </div>
              <div className="basis-1/2">
                <label htmlFor="yPosition" className="ml-2 text-indigo-500">
                  y
                </label>
                <input
                  name="yPosition"
                  type="number"
                  className="w-full rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
                  onBlur={(e) => handleInputChange('translateY', e)}
                  value={currentKeyframeStyles.translateY}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="rotate" className="mb-2 text-gray-100">
              rotate
            </label>
            <input
              name="rotate"
              type="number"
              className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
              onBlur={(e) => handleInputChange('rotate', e)}
              value={currentKeyframeStyles.rotate}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { Controls };
