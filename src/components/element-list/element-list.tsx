import { FC, Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useSelectedElementContext } from '../../state/selected-element';

const setElementIds = (elements: Element[]): Element[] => {
  const elementsWithIds = elements.map((element) => {
    if (!element.getAttribute('id')) {
      element.setAttribute('id', `animate-${uuidv4()}`);
      element.setAttribute('data-generated-animate-id', 'true');
    }

    return element;
  });

  return elementsWithIds;
};

const ElementList: FC = () => {
  const [elements, setElements] = useState<Element[] | null>(null);
  const { selectedElementID, setSelectedElementId } = useSelectedElementContext();

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
                <div>
                  <div className="flex w-full cursor-pointer items-center gap-2">
                    <Disclosure.Button>
                      <ChevronRightIcon
                        className={open ? ' w-4 rotate-90 transform text-slate-500' : 'w-4 text-slate-500'}
                      />
                    </Disclosure.Button>
                    <button aria-label="set selected element" onClick={() => handleElementSelect(element)}>
                      <span
                        className={
                          selectedElementID === element.getAttribute('id')
                            ? 'whitespace-nowrap text-indigo-600'
                            : 'whitespace-nowrap'
                        }
                      >
                        {element.getAttribute('id') ?? element.tagName}
                      </span>
                    </button>
                  </div>
                </div>
                <Disclosure.Panel className="ml-2 pt-2">
                  {[...element.children].map((childNode) => {
                    return <Fragment key={childNode.id}>{mapElementsChildNodes(childNode)}</Fragment>;
                  })}
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        )}
        {!element.hasChildNodes() && (
          <button
            aria-label="set selected element"
            className="ml-6 mt-1 cursor-pointer"
            onClick={() => handleElementSelect(element)}
          >
            <span
              className={
                selectedElementID === element.getAttribute('id')
                  ? 'whitespace-nowrap text-indigo-600'
                  : 'whitespace-nowrap'
              }
            >
              {element.getAttribute('id') ?? element.tagName}
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
      const allElementsArray = [...allElements];

      const elementsWithIds = setElementIds(allElementsArray);

      setElements(elementsWithIds);
    }
  }, []);

  return (
    <div>
      {!elements && <h1 data-cy="no_svg_message">No SVG in canvas</h1>}
      {elements && <div className="p-2">{mapElementsChildNodes(elements[0])}</div>}
    </div>
  );
};
export { ElementList };
