import { ChangeEvent, FC, Ref } from 'react';
import { KeyframeTime } from '@/features/project-animation/state/animations/animations';
import { keyframeTimes } from '../../../constants/constants';

const keyframePercentageMap: Record<KeyframeTime, string> = {
  '0': '0%',
  '0.25': '25%',
  '0.50': '50%',
  '0.75': '75%',
  '1': '100%',
};

interface ScrubberProps {
  scrubberRef: Ref<HTMLInputElement>;
  scrubberValue: number;
  animationsToPay: [] | Animation[];
  onScrubChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Scrubber: FC<ScrubberProps> = (props) => {
  const { scrubberRef, scrubberValue, animationsToPay, onScrubChange } = props;

  return (
    <div className="w-5/6">
      <div className="flex items-center justify-between">
        {keyframeTimes.map((time) => (
          <div className="text-sm" key={time}>
            {keyframePercentageMap[time]}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center">
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
