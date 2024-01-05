import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface CanvasValue {
  userSvg: string | null;
  setUserSvg: Dispatch<SetStateAction<string | null>>;
  formattedSVGForDownload: string | null;
  setFormattedSVGForDownload: Dispatch<SetStateAction<string | null>>;
}

const CanvasContext = createContext<CanvasValue | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

const CanvasProvider: FC<CanvasProviderProps> = ({ children }) => {
  const [userSvg, setUserSvg] = useState<string | null>(
    `
    <svg width="200" height="200" viewBox="0 0 74 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ps-buttons">
<g id="square" filter="url(#filter0_d_6_94)">
<rect x="5.5" y="23.5" width="13" height="13" stroke="#D390BC" stroke-width="3" shape-rendering="crispEdges"/>
</g>
<g id="triangle" filter="url(#filter1_d_6_94)">
<path d="M29.2058 16.5L37 3L44.7942 16.5H29.2058Z" stroke="#37DEC8" stroke-width="3" shape-rendering="crispEdges"/>
</g>
<g id="circle" filter="url(#filter2_d_6_94)">
<circle cx="61" cy="30" r="7.5" stroke="#EA6C6A" stroke-width="3" shape-rendering="crispEdges"/>
</g>
<g id="x" filter="url(#filter3_d_6_94)">
<path d="M30 59L44 45M30 45L44 59" stroke="#9BADE4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
</g>
</g>
<defs>
<filter id="filter0_d_6_94" x="0" y="22" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_94"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_94" result="shape"/>
</filter>
<filter id="filter1_d_6_94" x="22.6077" y="0" width="28.7847" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_94"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_94" result="shape"/>
</filter>
<filter id="filter2_d_6_94" x="48" y="21" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_94"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_94" result="shape"/>
</filter>
<filter id="filter3_d_6_94" x="25" y="44" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_94"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_94" result="shape"/>
</filter>
</defs>
</svg>

    `,
  );
  const [formattedSVGForDownload, setFormattedSVGForDownload] = useState<string | null>(null);

  return (
    <CanvasContext.Provider value={{ userSvg, setUserSvg, formattedSVGForDownload, setFormattedSVGForDownload }}>
      {children}
    </CanvasContext.Provider>
  );
};

const useCanvasContext = () => {
  const canvasContext = useContext(CanvasContext);
  if (canvasContext === undefined) {
    throw new Error('useCanvasContext must be inside a CanvasProvider');
  }
  return canvasContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CanvasProvider, useCanvasContext };
