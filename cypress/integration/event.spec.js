describe("event", function () {
  describe("create event", function () {
    beforeEach(() => {
      cy.signup({ email: "dave.lopper@mail.com", password: "azertyuiop" });
      cy.visit("/login");
      cy.get("[data-cy='email']").type("dave.lopper@mail.com");
      cy.get('[data-cy="password"]').type("azertyuiop");
      cy.get('[data-cy="formLogin"]').submit();
    });
    it("acces to create event", function () {
      cy.get('[cy-data="logoEvent"]').click();
      cy.url().should("include", "/event");
      cy.contains("créer nouvel evenement");
      cy.get('[data-cy="createBtn"]').click();
      cy.url().should("include", "/event/create");
    });
  });
});
