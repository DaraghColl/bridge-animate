import { FC } from 'react';

interface ZoomProps {
  onChangeZoom: (zoomType: 'minus' | 'plus') => void;
}

const Zoom: FC<ZoomProps> = (props) => {
  const { onChangeZoom } = props;
  return (
    <div className="absolute right-2 top-2 flex gap-4">
      <button onClick={() => onChangeZoom('minus')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <button onClick={() => onChangeZoom('plus')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export { Zoom };
