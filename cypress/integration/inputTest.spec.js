describe("testTest", function () {
  it("l'envoi de formulaire doit afficher nom-Mail", function () {
    cy.visit("http://localhost:3000/");
    cy.get("#name").type("Mon nom");
    cy.get("#mail").type("mail@mail.com");
    cy.get("#send").click();
    cy.get("#resultSpan").contains("Mon nom-mail@mail.com");
    cy.get("#name").should("have.value", "");
    cy.get("#mail").should("have.value", "");
  });
});
