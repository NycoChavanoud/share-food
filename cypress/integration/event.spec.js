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
      cy.get('[data-cy="logoEvent"]').click();
      cy.url().should("include", "/event");
      cy.contains("créer nouvel evenement");
      cy.get('[data-cy="createBtn"]').click();
      cy.url().should("include", "/event/create");
    });
    it("post new event", function () {
      cy.visit("/event/create");
      cy.get('[date-cy="title"]').type("Mon evenement test");
      cy.get('[date-cy="description"]').type(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui, ullam hic dolor tempore harum quia? Minima autem quaerat, ab nulla possimus sapiente, perferendis doloremque explicabo molestiae reprehenderit, ex officiis!"
      );
      cy.get('[date-cy="datePicker"]').type("e.g. 2022-05-31");
      cy.get('[date-cy="hourPicker"]').type("e.g. 12:30");
      cy.get('[date-cy="selectEventType"]').type("Au bureau");
      cy.get('[date-cy="adress"]').type("Au bureau");
      cy.get('[data-cy="formAddEvent"]').submit();
    });
  });
});
