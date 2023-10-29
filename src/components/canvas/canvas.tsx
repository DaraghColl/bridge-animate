import { FC, useEffect, useState } from 'react';
import { useSelectedElementContext } from '../../state/selected-element';
import { Zoom } from './zoom';

const Canvas: FC = () => {
  const { setSelectedElementId } = useSelectedElementContext();
  const [zoom, setZoom] = useState(100);

  const changeZoom = (zoomType: 'minus' | 'plus') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = document.getElementById('canvas')! as any; // using any as TS does not accept 'zoom' property
    if (!canvas) return;

    canvas.style.zoom = `${zoomType === 'minus' ? zoom - 10 : zoom + 10}%`;

    setZoom(zoomType === 'minus' ? zoom - 10 : zoom + 10);
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas')!;
    canvas.addEventListener('click', (event): void => {
      const { target } = event;
      if (target) {
        setSelectedElementId((target as HTMLElement).getAttribute('id'));
      }

      const controlPanel = document.getElementById('controls')!;
      controlPanel.querySelectorAll('input').forEach((element: HTMLInputElement) => {
        element.value = '';
      });
    });
  }, [setSelectedElementId]);

  return (
    <div className="relative flex basis-3/5 items-center justify-center rounded-md bg-dark-secondary">
      <Zoom onChangeZoom={changeZoom} />
      <span className="absolute right-2 top-10">{zoom}%</span>
      <div id="canvas">
        <svg width="200" height="200" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="guy-projects">
            <circle id="body" cx="15.7037" cy="8.99999" r="7.5" stroke="white" />
            <path
              id="foot--right"
              d="M21.2037 17C21.2037 17.0005 21.2037 17.0013 21.2034 17.0027C21.2031 17.0042 21.2023 17.0073 21.2003 17.0121C21.1963 17.022 21.1866 17.0405 21.1648 17.0663C21.1192 17.1202 21.0336 17.1902 20.8943 17.2599C20.6154 17.3993 20.1952 17.5 19.7037 17.5C19.2122 17.5 18.792 17.3993 18.5131 17.2599C18.3738 17.1902 18.2882 17.1202 18.2426 17.0663C18.2208 17.0405 18.2111 17.022 18.2071 17.0121C18.2051 17.0073 18.2043 17.0042 18.204 17.0027C18.2037 17.0013 18.2037 17.0005 18.2037 17C18.2037 16.9995 18.2037 16.9987 18.204 16.9973C18.2043 16.9958 18.2051 16.9927 18.2071 16.9878C18.2111 16.978 18.2208 16.9595 18.2426 16.9337C18.2882 16.8798 18.3738 16.8097 18.5131 16.7401C18.792 16.6007 19.2122 16.5 19.7037 16.5C20.1952 16.5 20.6154 16.6007 20.8943 16.7401C21.0336 16.8097 21.1192 16.8798 21.1648 16.9337C21.1866 16.9595 21.1963 16.978 21.2003 16.9878C21.2023 16.9927 21.2031 16.9958 21.2034 16.9973C21.2037 16.9987 21.2037 16.9995 21.2037 17Z"
              stroke="white"
            />
            <path
              id="foot--left"
              d="M13.2037 17C13.2037 17.0005 13.2037 17.0013 13.2034 17.0027C13.2031 17.0042 13.2023 17.0073 13.2003 17.0121C13.1963 17.022 13.1866 17.0405 13.1648 17.0663C13.1192 17.1202 13.0336 17.1902 12.8943 17.2599C12.6154 17.3993 12.1952 17.5 11.7037 17.5C11.2122 17.5 10.792 17.3993 10.5131 17.2599C10.3738 17.1902 10.2882 17.1202 10.2426 17.0663C10.2208 17.0405 10.2111 17.022 10.2071 17.0121C10.2051 17.0073 10.2043 17.0042 10.204 17.0027C10.2037 17.0013 10.2037 17.0005 10.2037 17C10.2037 16.9995 10.2037 16.9987 10.204 16.9973C10.2043 16.9958 10.2051 16.9927 10.2071 16.9878C10.2111 16.978 10.2208 16.9595 10.2426 16.9337C10.2882 16.8798 10.3738 16.8097 10.5131 16.7401C10.792 16.6007 11.2122 16.5 11.7037 16.5C12.1952 16.5 12.6154 16.6007 12.8943 16.7401C13.0336 16.8097 13.1192 16.8798 13.1648 16.9337C13.1866 16.9595 13.1963 16.978 13.2003 16.9878C13.2023 16.9927 13.2031 16.9958 13.2034 16.9973C13.2037 16.9987 13.2037 16.9995 13.2037 17Z"
              stroke="white"
            />
            <circle id="eye--right" cx="18.7037" cy="5.99999" r="1" fill="white" />
            <circle id="eye--left" cx="12.7037" cy="5.99999" r="1" fill="white" />
            <path id="hand--left" d="M6.2037 4.99999C5.87036 6.83333 5.7037 10.4 7.7037 9.99999" stroke="white" />
            <path
              id="Vector"
              d="M6.72134 3.51065L7.31473 3.66005C7.43838 3.69123 7.54459 3.77024 7.60999 3.87972C7.67538 3.9892 7.69461 4.12017 7.66344 4.24383C7.63226 4.36748 7.55325 4.47369 7.44377 4.53908C7.33429 4.60448 7.20332 4.62371 7.07966 4.59253L2.02732 3.31889C1.8415 3.27199 1.67029 3.17954 1.52914 3.0499L0.999999 2.56405L1.69623 2.3871C1.88196 2.33986 2.07654 2.33962 2.26239 2.38641L6.72147 3.51087L6.72134 3.51065ZM6.72134 3.51065L6.48751 4.43821"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export { Canvas };
