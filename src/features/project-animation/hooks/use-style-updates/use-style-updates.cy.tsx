/* eslint-disable react-refresh/only-export-components */
import { useRef } from 'react';
import { useStyleUpdates } from './use-style-updates';
import { Style } from '../../state/animations/animations';

const MockComponent = () => {
  const { updateSelectedElementTemporaryStyles, removeElementStyles } = useStyleUpdates();
  const divRef = useRef(null);
  const keyframeStyles: Style = {
    opacity: '0.5',
  };

  const updateStyles = () => {
    if (divRef.current) updateSelectedElementTemporaryStyles(divRef.current, keyframeStyles);
  };

  const removeStyles = () => {
    if (divRef.current) removeElementStyles(divRef.current, divRef.current);
  };

  return (
    <div>
      <div ref={divRef} data-cy="mock_component_ref" style={{ opacity: 1 }}>
        Use Styles Updates
      </div>
      <button onClick={updateStyles} data-cy="mock_component_button_update">
        Update
      </button>

      <button onClick={removeStyles} data-cy="mock_component_button_remove">
        Remove
      </button>
    </div>
  );
};

describe('Use Styles Updates hook', () => {
  it('should change styeles of div', () => {
    cy.mount(<MockComponent />);

    cy.get('[data-cy="mock_component_button_update"]').click();

    cy.get('[data-cy="mock_component_ref"]').should('have.attr', 'style', 'opacity: 0.5;');
  });

  // TODO: fix below test not working with cypress:run

  // it('remove styles of elements', () => {
  //   cy.mount(<MockComponent />);

  //   cy.get('[data-cy="mock_component_button_remove"]').click();

  //   cy.get('[data-cy="mock_component_ref"]').should('not.have.attr', 'style');
  // });
});
