import { FC, ChangeEvent, Fragment } from 'react';
import { StyleType, useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';

const Controls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles, selectedKeyFrameTime } = useAnimationsContext();

  const handleInputChange = (style: StyleType, e: ChangeEvent<HTMLInputElement>) => {
    if (selectedElementID) {
      createKeyframeStyles(selectedElementID, style, e.target.value);
    }
  };

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
              // min={0}
              // max={360}
              className="rounded-sm bg-dark-primary px-2 py-1 text-gray-100 outline-none"
              onBlur={(e) => handleInputChange('rotate', e)}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export { Controls };
