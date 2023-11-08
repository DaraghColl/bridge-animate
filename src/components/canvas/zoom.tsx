import { FC } from 'react';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface ZoomProps {
  onChangeZoom: (zoomType: 'minus' | 'plus') => void;
}

const Zoom: FC<ZoomProps> = (props) => {
  const { onChangeZoom } = props;
  return (
    <div className="absolute right-2 top-2 flex gap-4">
      <button aria-label="descrease zoom" onClick={() => onChangeZoom('minus')}>
        <MinusCircleIcon className="h-6  w-6" />
      </button>
      <button aria-label="increase zoom" onClick={() => onChangeZoom('plus')}>
        <PlusCircleIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export { Zoom };
