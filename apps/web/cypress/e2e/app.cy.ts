describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3002/");

    // The page should contain an h1 with "Toohakai" and some other text
    cy.get("h1").contains("Toohakai");
    cy.get("p").contains("A really cool quiz app");

    // cy.get('[data-cy="login-button"]').click()

    // The new url should include "/about"
    // cy.url().should('include', '/about')
  });
});
