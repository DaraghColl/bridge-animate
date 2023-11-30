import { ThemeProvider } from '@shared/state/theme/theme';
import { ThemeToggle } from './theme-toggle';

describe('Theme Toggle Component', () => {
  it('should show sun icon for dark mode initially', () => {
    cy.mount(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    cy.get('[data-cy="theme_toggle_sun_icon"]').should('be.visible');
  });

  it('should show moon icon for light mode affter theme toggle button click', () => {
    cy.mount(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    cy.get('[data-cy="theme_toggle_button"]').click();

    cy.get('[data-cy="theme_toggle_moon_icon"]').should('be.visible');
  });
});
