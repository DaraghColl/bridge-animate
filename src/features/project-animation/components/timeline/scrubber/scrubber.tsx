import { ChangeEvent, FC, Ref } from 'react';
import { keyframeTimes } from '../../../constants/constants';

interface ScrubberProps {
  scrubberRef: Ref<HTMLInputElement>;
  scrubberValue: number;
  animationsToPay: [] | Animation[];
  onScrubChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Scrubber: FC<ScrubberProps> = (props) => {
  const { scrubberRef, scrubberValue, animationsToPay, onScrubChange } = props;

  return (
    <div className="w-5/6 pr-2 pt-2">
      <div className="absolute top-1 flex w-[80%] items-center justify-between">
        {keyframeTimes.map((time) => (
          <div className="px-1 text-xs" key={time}></div>
        ))}
      </div>
      <div className="mt-5 flex items-center pb-4">
        <input
          ref={scrubberRef}
          value={scrubberValue}
          id="scrubber"
          type="range"
          className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-light-secondary accent-accent"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onScrubChange(e)}
          min="0"
          max="2500"
          disabled={animationsToPay.length <= 0}
        ></input>
      </div>
    </div>
  );
};

export { Scrubber };
