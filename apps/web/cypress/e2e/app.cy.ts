describe("Navigation", () => {
  // it("should navigate to the about page", () => {
  //   // Start from the index page
  //   cy.visit("http://localhost:3002/?test=true"); // todo: set this dynamically

  //   // The page should contain an h1 with "Toohakai" and some other text
  //   cy.get("h3").contains("Toohakai");
  //   cy.get("p").contains("A fun quiz app");

  //   cy.get('[data-cy="test-login-button"]').click();

  //   // wait 10 seconds for the login to complete
  //   cy.wait(5000); // TODO: make this dynamic

  //   cy.get('[href="/dashboard/teacher"]').click();

  //   // The new url should include "/dashboard/teacher"
  //   cy.location().url().should("include", "/dashboard/teacher");
  // });

  it("should create new questions bank", () =>{
    cy.visit("http://localhost:3002/?test=true"); // todo: set this dynamically

    cy.get("h3").contains("Toohakai");
    cy.get("p").contains("A fun quiz app");

    cy.get('[data-cy="test-login-button"]').click();
    cy.wait(5000);
    cy.location().url().should("include", "test=true")

    cy.get('.flex > [href="/dashboard/teacher/question-banks"]').click();  // Click on question bank button
    cy.wait(3000);
    cy.location().url().should("include", "question-banks")

    cy.get('.min-h-full > .flex > .inline-flex').click();
    cy.wait(3000);
    // Need to find out how to input into box
    cy.get('.space-y-2 > .flex').type("Physics");
    
    // Line below does not work properly, can't select submit button
    //cy.get('.fixed > .flex > .inline-flex').click();

  });

  it("should navigate to quizzes page", () =>{
    cy.visit("http://localhost:3002/?test=true"); // todo: set this dynamically

    cy.get("h3").contains("Toohakai");
    cy.get("p").contains("A fun quiz app");

    cy.get('[data-cy="test-login-button"]').click();
    cy.wait(5000);
    cy.location().url().should("include", "test=true")

    cy.get('.flex > [href="/dashboard/teacher/quizzes"]').click();  // Click on question bank button
    cy.wait(3000);
    cy.location().url().should("include", "quizzes")
  })
});
