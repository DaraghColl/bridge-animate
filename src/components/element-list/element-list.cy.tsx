/* eslint-disable react-refresh/only-export-components */
import { ElementList } from './element-list';
import { SelectedElementProvider, useSelectedElementContext } from '../../state/selected-element';

const MockCanvas = () => {
  return (
    <div id="canvas">
      <svg id="mock_svg" width="200" height="200" viewBox="0 0 98 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="circles">
          <circle id="circle-3" cx="86" cy="12" r="12" fill="#EC4899" />
          <circle id="circle-2" cx="49" cy="12" r="12" fill="#6366F1" />
          <circle id="circle-1" cx="12" cy="12" r="12" fill="#3B82F6" />
        </g>
      </svg>
    </div>
  );
};

const MockSelectedElementText = () => {
  const { selectedElementID } = useSelectedElementContext();

  return <div data-cy="mock_selected_element_id">{selectedElementID}</div>;
};

describe('<ElementList />', () => {
  it('should show no element in canvas message', () => {
    cy.mount(
      <SelectedElementProvider>
        <ElementList />
      </SelectedElementProvider>,
    );

    cy.get('[data-cy="no_svg_message"]').contains('No SVG in canvas');
  });

  it('should show parent element', () => {
    cy.mount(
      <SelectedElementProvider>
        <MockCanvas />
        <ElementList />
      </SelectedElementProvider>,
    );

    cy.contains('div', 'mock_svg');
  });

  it('should set selected element id on click', () => {
    cy.mount(
      <SelectedElementProvider>
        <MockCanvas />
        <ElementList />
        <MockSelectedElementText />
      </SelectedElementProvider>,
    );

    cy.contains('button', 'mock_svg').click();

    cy.get('[data-cy="mock_selected_element_id"]').contains('mock_svg');
  });
});
