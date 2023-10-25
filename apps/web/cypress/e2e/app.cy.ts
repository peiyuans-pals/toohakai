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
    cy.viewport("macbook-15")
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


    // cy.get('[href="/dashboard/teacher"]').click();

    // The new url should include "/dashboard/teacher"
    cy.location().url().should("include", "/dashboard/teacher");

    cy.contains('Question Banks').click();
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
    cy.contains('Question Banks').click();
    cy.wait(2000);
    cy.contains("Cypress test run").click();
    cy.wait(1000);
    cy.contains("New Question").click();
    cy.get(`[name="question_name"]`).type("Cypress test question: Which of the following is not a valid type of energy?")
    cy.get(`[name="option1"]`).type("Kinetic Energy");
    cy.get(`[name="option2"]`).type("Elastic Potential Energy");
    cy.get(`[name="option3"]`).type("Gravitational Potential Energy");
    cy.get(`[name="option4"]`).type("Internal energy");
    cy.get(`[id="r4"]`).click();
    cy.get('form').submit()
    cy.wait(2000);

    cy.contains("Cypress test question").should("be.visible");
    cy.contains("Cypress test question").click();
    cy.contains("1. Kinetic Energy").should("be.visible");
    cy.wait(2000)
  })

  it("Edit questions in question bank", () => {
    cy.contains('Question Banks').click();
    cy.wait(2000);
    cy.contains("Cypress test run").click();
    cy.wait(1000);
    cy.get('.p-2.flex > .bg-primary').click();
    cy.contains("Edit Question").should("be.visible");
    cy.get(`[name="question_name"]`).clear()
    cy.get(`[name="question_name"]`).type("Cypress test question Edited: Which of the following is not a valid type of energy?");
    cy.get(`[name="option2"]`).clear();
    cy.get(`[name="option2"]`).type("Thermal Energy");
    cy.get('form').submit();

      cy.contains("Cypress test question Edited").should("be.visible");
      cy.contains("Cypress test question").click();
      cy.contains("2. Thermal Energy").should("be.visible");
      cy.wait(2000)
  })
  //
  it("Delete question in question bank", () => {
    cy.contains('Question Banks').click();
    cy.wait(1000);
    cy.contains("Cypress test run").click();
    cy.wait(2000);
    cy.contains("Remove").click();
    cy.wait(1000);
    cy.contains("Confirm Removal").click();
    cy.wait(1000);
    cy.contains("Question bank doesnt have any questions").should("be.visible");
  })

  it("Edit question bank name", () => {
    cy.contains('Question Banks').click();
    cy.contains("Cypress test run").click();
    cy.wait(2000);

    cy.contains("Edit Question Bank Name").click();
    cy.get(`[name="topic_name"]`).type("Edited quiz name");
    cy.get('form').submit();
    cy.contains("Edited quiz name").should("be.visible");
  })

  it("Delete question bank", () => {
    cy.contains('Question Banks').click();
    cy.contains("Edited quiz name").click();
    cy.wait(2000);

    cy.contains("Delete Question Bank").click();
    cy.wait(1000);
    cy.contains("Confirm Removal").click();
    cy.contains('Edited quiz name').should('not.exist')
  })
});
