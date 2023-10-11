describe("Testing login", () => {
  it("should navigate to the dashboard/teacher page", () => {
    // Start from the index page
    cy.visit("https://www.toohakai.fun/?test=true"); // todo: set this dynamically

    // The page should contain an h3 with "Toohakai" and some other text
    cy.get('.text-4xl').contains("Toohakai").should("be.visible");
    cy.get('.text-2xl').contains("Assess and practice, in the classroom and beyond.").should("be.visible");
    cy.url().should("include", "test=true")

    cy.log("login via test login button")
    cy.wait(2000);
    cy.get('[data-cy="test-login-button"]').click();

    cy.location().url().should("include", "/dashboard/teacher");
  })
})

describe("Toohakai E2E tests", () => {
  beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit("https://www.toohakai.fun/?test=true");
    cy.get('.text-4xl').contains("Toohakai").should("be.visible");
    cy.get('.text-2xl').contains("Assess and practice, in the classroom and beyond.").should("be.visible");
    cy.url().should("include", "test=true")
    cy.get('[data-cy="test-login-button"]').click();
    cy.location().url().should("include", "/dashboard/teacher");
  })
  it("should create a question bank", () => {
    // wait 10 seconds for the login to complete
    //cy.wait(5000); // TODO: make this dynamic


    cy.get('[href="/dashboard/teacher"]').click();

    // The new url should include "/dashboard/teacher"
    cy.location().url().should("include", "/dashboard/teacher");

    cy.get('.flex > [href="/dashboard/teacher/question-banks"]').click();
    cy.get('.min-h-full > .flex > .inline-flex').click();

    //cy.get('.flex > [href="/dashboard/teacher/quizzes"]').click();  // Click on question bank button
    cy.wait(1000);
    cy.contains("Submit").click();
    cy.log("Test to make sure empty topic names do not work.")
    cy.contains("Topic Name must contain at least 4 characters").should("be.visible");
    cy.wait(3000);
    cy.get('.space-y-2').click().type("Cypress test run Physics quiz");
    cy.contains("Submit").click();
    cy.get('.grid').contains("Cypress test run Physics quiz").should("be.visible");
    //cy.location().url().should("include", "quizzes")
  })

  it("Add questions to question bank", () => {

  })
});
