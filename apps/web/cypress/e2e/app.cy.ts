describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3002/?test=true"); // todo: set this dynamically

    // The page should contain an h1 with "Toohakai" and some other text
    cy.get("h3").contains("Toohakai");
    cy.get("p").contains("A fun quiz app");

    cy.get('[data-cy="test-login-button"]').click();

    // wait 10 seconds for the login to complete
    cy.wait(5000); // TODO: make this dynamic

    cy.get('[href="/dashboard/teacher"]').click();

    // The new url should include "/dashboard/teacher"
    cy.location().url().should("include", "/dashboard/teacher");
  });
});
