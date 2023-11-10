/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { usePrevious } from './use-previous';

const MockUsePreviousComponent = () => {
  const [count, setCount] = useState<number>(1);
  const previousCount = usePrevious(count);

  const handleClick = () => {
    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <div>
      <button data-cy="mock_increase_count" onClick={handleClick}>
        Click
      </button>
      <div data-cy="mock_count">{count}</div>
      <div data-cy="mock_previous_count">{previousCount}</div>
    </div>
  );
};

describe('<ElementList />', () => {
  it('should show no element in canvas message', () => {
    cy.mount(<MockUsePreviousComponent />);

    cy.get('[data-cy="mock_increase_count"]').click();
    cy.get('[data-cy="mock_count"]').contains(2);
    cy.get('[data-cy="mock_previous_count"]').contains(1);
  });
});
