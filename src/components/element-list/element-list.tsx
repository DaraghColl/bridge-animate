import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, CubeTransparentIcon } from '@heroicons/react/24/solid';
import { useSelectedElementContext } from '@state/selected-element';
import { useCanvasContext } from '@state/canvas';
import { formatRandomIdOnLabel } from '@/utils/format-animation/format-animaton';
import { ImportSvg } from '../import-svg/import-svg';

const listOfElementstoAllowAnimation = [
  'circle',
  'clipPath',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tspan',
  'use',
  'view',
];

const setElementIds = (elements: Element[]): Element[] => {
  const elementsWithIds = elements.map((element) => {
    if (!element.getAttribute('id')) {
      element.setAttribute('id', `${element.tagName}-${uuidv4()}`);
      element.setAttribute('data-generated-animate-id', 'true');
    }

    const duplicateIds = elements.filter((el) => el.getAttribute('id') === element.getAttribute('id'));

    if (duplicateIds.length > 1) {
      const currentId = element.getAttribute('id');
      element.setAttribute('id', `${currentId}-animate-${uuidv4()}`);
    }

    return element;
  });

  return elementsWithIds;
};

const getElementIcon = (elementTagName: string) => {
  const iconMap: Record<string, ReactNode> = {
    circle: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="circle">
          <path
            id="Vector"
            className="stroke-dark-secondary dark:stroke-white"
            d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    rect: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="h-4 w-4 stroke-dark-secondary dark:stroke-white"
          x="4.5"
          y="4.5"
          width="15"
          height="15"
          stroke="black"
        />
      </svg>
    ),
    path: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="h-4 w-4 stroke-dark-secondary dark:stroke-white"
          d="M6 6C8 6.83333 11.8 9.3 11 12.5C10.2 15.7 15.3333 16.8333 18 17"
          stroke="black"
        />
      </svg>
    ),
    svg: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="stroke-dark-secondary dark:stroke-white"
          d="M19 14.4872V11.9744C19 11.1175 18.6681 10.2957 18.0774 9.68986C17.4866 9.08397 16.6854 8.74359 15.85 8.74359H14.45C14.1715 8.74359 13.9045 8.63013 13.7075 8.42817C13.5106 8.2262 13.4 7.95228 13.4 7.66667V6.23077C13.4 5.37392 13.0681 4.55216 12.4774 3.94627C11.8866 3.34038 11.0854 3 10.25 3H8.5M10.6 3H6.05C5.4704 3 5 3.48246 5 4.07692V20.5897C5 21.1842 5.4704 21.6667 6.05 21.6667H17.95C18.5296 21.6667 19 21.1842 19 20.5897V11.6154C19 9.33044 18.115 7.13909 16.5397 5.52339C14.9644 3.90769 12.8278 3 10.6 3Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="stroke-dark-secondary dark:stroke-white"
          d="M9.64884 12.8835L9.27242 12.9901C9.24874 12.9273 9.21382 12.8664 9.16766 12.8072C9.12268 12.7468 9.06112 12.6971 8.983 12.658C8.90487 12.619 8.80485 12.5994 8.68293 12.5994C8.51602 12.5994 8.37694 12.6379 8.26567 12.7148C8.15558 12.7906 8.10054 12.8871 8.10054 13.0043C8.10054 13.1084 8.13842 13.1907 8.21418 13.2511C8.28994 13.3114 8.40831 13.3617 8.56929 13.402L8.97412 13.5014C9.21797 13.5606 9.39967 13.6512 9.51922 13.7731C9.63878 13.8938 9.69855 14.0495 9.69855 14.2401C9.69855 14.3963 9.65357 14.536 9.56361 14.6591C9.47483 14.7822 9.35054 14.8793 9.19074 14.9503C9.03094 15.0213 8.8451 15.0568 8.63321 15.0568C8.35504 15.0568 8.12481 14.9964 7.94252 14.8757C7.76022 14.755 7.64481 14.5786 7.59628 14.3466L7.99401 14.2472C8.03189 14.3939 8.1035 14.504 8.20885 14.5774C8.31539 14.6508 8.45447 14.6875 8.62611 14.6875C8.82142 14.6875 8.97649 14.6461 9.09131 14.5632C9.20731 14.4792 9.26531 14.3786 9.26531 14.2614C9.26531 14.1667 9.23217 14.0874 9.16588 14.0234C9.09959 13.9583 8.9978 13.9098 8.86048 13.8778L8.40594 13.7713C8.15618 13.7121 7.9727 13.6204 7.85551 13.4961C7.73951 13.3706 7.68151 13.2138 7.68151 13.0256C7.68151 12.8717 7.72471 12.7356 7.81112 12.6172C7.89872 12.4988 8.01768 12.4059 8.16801 12.3384C8.31953 12.271 8.49117 12.2372 8.68293 12.2372C8.95281 12.2372 9.1647 12.2964 9.31858 12.4148C9.47365 12.5331 9.58373 12.6894 9.64884 12.8835ZM12.5594 12.2727L11.5509 15H11.1248L10.1163 12.2727H10.5708L11.3236 14.446H11.3521L12.1049 12.2727H12.5594ZM14.1157 16.0795C13.9133 16.0795 13.7393 16.0535 13.5937 16.0014C13.4481 15.9505 13.3268 15.883 13.2297 15.799C13.1338 15.7161 13.0575 15.6274 13.0007 15.5327L13.3345 15.2983C13.3724 15.348 13.4203 15.4048 13.4783 15.4688C13.5363 15.5339 13.6156 15.5901 13.7162 15.6374C13.818 15.686 13.9512 15.7102 14.1157 15.7102C14.3359 15.7102 14.5176 15.657 14.6608 15.5504C14.8041 15.4439 14.8757 15.277 14.8757 15.0497V14.4957H14.8402C14.8094 14.5455 14.7656 14.607 14.7088 14.6804C14.6531 14.7526 14.5726 14.8171 14.4673 14.8739C14.3631 14.9296 14.2223 14.9574 14.0447 14.9574C13.8245 14.9574 13.6268 14.9053 13.4517 14.8011C13.2777 14.697 13.1398 14.5455 13.038 14.3466C12.9373 14.1477 12.887 13.9062 12.887 13.6222C12.887 13.3428 12.9362 13.0996 13.0344 12.8924C13.1326 12.6841 13.2694 12.5231 13.4446 12.4094C13.6197 12.2946 13.8222 12.2372 14.0518 12.2372C14.2294 12.2372 14.3702 12.2668 14.4744 12.326C14.5797 12.384 14.6602 12.4503 14.7159 12.5249C14.7727 12.5982 14.8165 12.6586 14.8473 12.706H14.8899V12.2727H15.2947V15.0781C15.2947 15.3125 15.2414 15.5031 15.1349 15.6499C15.0295 15.7978 14.8875 15.9061 14.7088 15.9748C14.5312 16.0446 14.3335 16.0795 14.1157 16.0795ZM14.1015 14.581C14.2696 14.581 14.4117 14.5425 14.5277 14.4656C14.6437 14.3886 14.7318 14.2779 14.7922 14.1335C14.8526 13.9891 14.8828 13.8163 14.8828 13.6151C14.8828 13.4186 14.8532 13.2451 14.794 13.0948C14.7348 12.9445 14.6472 12.8267 14.5312 12.7415C14.4152 12.6562 14.272 12.6136 14.1015 12.6136C13.924 12.6136 13.776 12.6586 13.6576 12.7486C13.5404 12.8385 13.4523 12.9593 13.3931 13.1108C13.3351 13.2623 13.3061 13.4304 13.3061 13.6151C13.3061 13.8045 13.3357 13.9719 13.3948 14.1175C13.4552 14.262 13.544 14.3756 13.6612 14.4585C13.7795 14.5401 13.9263 14.581 14.1015 14.581Z"
          fill="black"
        />
      </svg>
    ),
    line: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="stroke-dark-secondary dark:stroke-white" d="M12 3V21" stroke="black" />
      </svg>
    ),
    text: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="stroke-dark-secondary dark:stroke-white"
          d="M4.94318 15H4.20455L6.34091 9.18182H7.06818L9.20455 15H8.46591L6.72727 10.1023H6.68182L4.94318 15ZM5.21591 12.7273H8.19318V13.3523H5.21591V12.7273ZM10.1108 15V9.18182H12.1449C12.5502 9.18182 12.8845 9.25189 13.1477 9.39205C13.411 9.5303 13.607 9.71686 13.7358 9.9517C13.8646 10.1847 13.929 10.4432 13.929 10.7273C13.929 10.9773 13.8845 11.1837 13.7955 11.3466C13.7083 11.5095 13.5928 11.6383 13.4489 11.733C13.3068 11.8277 13.1525 11.8977 12.9858 11.9432V12C13.1638 12.0114 13.3428 12.0739 13.5227 12.1875C13.7027 12.3011 13.8532 12.464 13.9744 12.6761C14.0956 12.8883 14.1562 13.1477 14.1562 13.4545C14.1562 13.7462 14.09 14.0085 13.9574 14.2415C13.8248 14.4744 13.6155 14.6591 13.3295 14.7955C13.0436 14.9318 12.6714 15 12.2131 15H10.1108ZM10.8153 14.375H12.2131C12.6733 14.375 13 14.286 13.1932 14.108C13.3883 13.928 13.4858 13.7102 13.4858 13.4545C13.4858 13.2576 13.4356 13.0758 13.3352 12.9091C13.2348 12.7405 13.0919 12.6061 12.9062 12.5057C12.7206 12.4034 12.5009 12.3523 12.2472 12.3523H10.8153V14.375ZM10.8153 11.7386H12.1222C12.3343 11.7386 12.5256 11.697 12.696 11.6136C12.8684 11.5303 13.0047 11.4129 13.1051 11.2614C13.2074 11.1098 13.2585 10.9318 13.2585 10.7273C13.2585 10.4716 13.1695 10.2547 12.9915 10.0767C12.8134 9.89678 12.5313 9.80682 12.1449 9.80682H10.8153V11.7386ZM19.9957 11H19.2912C19.2495 10.7973 19.1766 10.6193 19.0724 10.4659C18.9702 10.3125 18.8452 10.1837 18.6974 10.0795C18.5516 9.97348 18.3897 9.89394 18.2116 9.84091C18.0336 9.78788 17.848 9.76136 17.6548 9.76136C17.3026 9.76136 16.9834 9.85038 16.6974 10.0284C16.4134 10.2064 16.187 10.4688 16.0185 10.8153C15.8518 11.1619 15.7685 11.5871 15.7685 12.0909C15.7685 12.5947 15.8518 13.0199 16.0185 13.3665C16.187 13.7131 16.4134 13.9754 16.6974 14.1534C16.9834 14.3314 17.3026 14.4205 17.6548 14.4205C17.848 14.4205 18.0336 14.3939 18.2116 14.3409C18.3897 14.2879 18.5516 14.2093 18.6974 14.1051C18.8452 13.9991 18.9702 13.8693 19.0724 13.7159C19.1766 13.5606 19.2495 13.3826 19.2912 13.1818H19.9957C19.9427 13.4792 19.8461 13.7453 19.706 13.9801C19.5658 14.215 19.3916 14.4148 19.1832 14.5795C18.9749 14.7424 18.741 14.8665 18.4815 14.9517C18.224 15.0369 17.9484 15.0795 17.6548 15.0795C17.1586 15.0795 16.7173 14.9583 16.331 14.7159C15.9446 14.4735 15.6406 14.1288 15.419 13.6818C15.1974 13.2348 15.0866 12.7045 15.0866 12.0909C15.0866 11.4773 15.1974 10.947 15.419 10.5C15.6406 10.053 15.9446 9.70833 16.331 9.46591C16.7173 9.22348 17.1586 9.10227 17.6548 9.10227C17.9484 9.10227 18.224 9.14489 18.4815 9.23011C18.741 9.31534 18.9749 9.44034 19.1832 9.60511C19.3916 9.76799 19.5658 9.96686 19.706 10.2017C19.8461 10.4347 19.9427 10.7008 19.9957 11Z"
          fill="black"
        />
      </svg>
    ),
    g: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          className="stroke-dark-secondary dark:stroke-white"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
        />
      </svg>
    ),
  };

  return iconMap[elementTagName] ? iconMap[elementTagName] : iconMap['path'];
};

const ElementList: FC = () => {
  const [elements, setElements] = useState<Element[] | null>(null);
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();
  const { userSvg, setFormattedSVGForDownload } = useCanvasContext();

  const mapElementsChildNodes = (element: Element) => {
    const handleElementSelect = (element: Element) => {
      setSelectedElementId(element.getAttribute('id'));
    };

    return (
      <div>
        {element.hasChildNodes() && (
          <Disclosure>
            {({ open }) => (
              <Fragment>
                <div className="flex w-full cursor-pointer items-center gap-2 text-sm font-normal">
                  <Disclosure.Button>
                    <ChevronRightIcon
                      className={open ? ' w-4 rotate-90 transform text-slate-medium' : 'w-4 text-slate-medium'}
                    />
                  </Disclosure.Button>
                  <button
                    aria-label="set selected element"
                    onClick={() => handleElementSelect(element)}
                    className="flex items-center gap-4"
                  >
                    <span>{getElementIcon(element.tagName)}</span>
                    <span
                      className={
                        selectedElementID === element.getAttribute('id')
                          ? 'whitespace-nowrap text-accent'
                          : 'whitespace-nowrap'
                      }
                    >
                      {formatRandomIdOnLabel(element.getAttribute('id')!)}
                    </span>
                  </button>
                </div>
                <Disclosure.Panel className="ml-2 pt-2 text-sm font-normal">
                  {[...element.children].map((childNode) => {
                    return listOfElementstoAllowAnimation.includes(childNode.tagName) ? (
                      <Fragment key={childNode.id}>{mapElementsChildNodes(childNode)}</Fragment>
                    ) : null;
                  })}
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        )}
        {!element.hasChildNodes() && (
          <button
            aria-label="set selected element"
            className="ml-6 mt-1 flex cursor-pointer items-center gap-4"
            onClick={() => handleElementSelect(element)}
          >
            <span>{getElementIcon(element.tagName)}</span>
            <span
              className={
                selectedElementID === element.getAttribute('id') ? 'whitespace-nowrap text-accent' : 'whitespace-nowrap'
              }
            >
              {formatRandomIdOnLabel(element.getAttribute('id')!)}
            </span>
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas');

    if (canvas) {
      const allElements = canvas.getElementsByTagName('*');

      const allElementsfFiltered = [...allElements].filter((element) => {
        if (listOfElementstoAllowAnimation.includes(element.tagName)) {
          return element;
        }
      });

      const elementsWithIds = setElementIds(allElementsfFiltered);

      if (elementsWithIds.length <= 0) return;

      setElements(elementsWithIds);

      // need to set an svg for export as it has new id's for animating
      const svgString = canvas.getElementsByTagName('svg')[0].outerHTML;
      setFormattedSVGForDownload(svgString);
    }
  }, [userSvg, setFormattedSVGForDownload]);

  return (
    <div className="p-2">
      <div className="mb-4 flex justify-between text-sm font-normal">
        <div className="flex items-center gap-2">
          <CubeTransparentIcon className="h-4 w-4" />
          <span>Elements</span>
        </div>
        <div>
          <ImportSvg />
        </div>
      </div>

      {elements && userSvg && <div>{mapElementsChildNodes(elements[0])}</div>}
    </div>
  );
};
export { ElementList };
