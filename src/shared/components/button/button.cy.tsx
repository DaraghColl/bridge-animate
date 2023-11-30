import { Button } from './button';

describe('Button component', () => {
  it('should show correct classes for variant filled and color accent button', () => {
    cy.mount(
      <Button variant="filled" color="accent" onClick={() => {}} data-cy="button">
        Button Component Test
      </Button>,
    );

    cy.get('[data-cy="button"]').should('have.class', 'text-white');
    cy.get('[data-cy="button"]').should('have.class', 'bg-accent');
    cy.get('[data-cy="button"]').should('have.text', 'Button Component Test');
  });
});
