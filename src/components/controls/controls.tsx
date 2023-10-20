import { FC, ChangeEvent } from 'react';
import { Style, useAnimationsContext } from '../../state/animations';
import { useSelectedElementContext } from '../../state/selected-element';

const Controls: FC = () => {
  const { selectedElementID } = useSelectedElementContext();
  const { createKeyframeStyles } = useAnimationsContext();

  const handleInputChange = (style: Style, e: ChangeEvent<HTMLInputElement>) => {
    if (selectedElementID) {
      createKeyframeStyles(selectedElementID, style, e.target.value);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="opacity">opacity</label>
        <input name="opacity" type="number" className="text-black" onChange={(e) => handleInputChange('opacity', e)} />
      </div>

      <div>
        <label htmlFor="xPosition">x position</label>
        <input
          name="xPosition"
          type="number"
          className="text-black"
          onChange={(e) => handleInputChange('translateX', e)}
        />
      </div>

      <div>
        <label htmlFor="yPosition">y position</label>
        <input
          name="yPosition"
          type="number"
          className="text-black"
          onChange={(e) => handleInputChange('translateY', e)}
        />
      </div>

      <div>
        <label htmlFor="rotate">rotate</label>
        <input
          name="rotate"
          type="number"
          // min={0}
          // max={360}
          className="text-black"
          onChange={(e) => handleInputChange('rotate', e)}
        />
      </div>
    </div>
  );
};

export { Controls };
