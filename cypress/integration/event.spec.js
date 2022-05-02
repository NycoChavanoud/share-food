describe("event", function () {
  describe("create event", function () {
    beforeEach(() => {
      cy.setupCurrentUser();
    });

    it("acces to create event", function () {
      cy.visit("/");
      cy.get('[data-cy="logoEvent"]').click();
      cy.url().should("include", "/events");
      cy.contains("créer nouvel evenement");
      cy.get('[data-cy="createBtn"]').click();
      cy.url().should("include", "/events/create");
    });

    it("create a new event", function () {
      cy.visit("/events/create");
      cy.get('[data-cy="title"]').type("Mon evenement test");
      cy.get('[data-cy="description"]').type(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui, ullam hic dolor tempore harum quia? Minima autem quaerat, ab nulla possimus sapiente"
      );
      cy.get("select").select("Au resto");
      cy.get('[data-cy="address"]').type("50 rue de la soif, 69000 LYON");
      cy.get('[data-cy="formAddEvent"]').submit();
      cy.url().should("include", "/events");
      cy.contains("🦄 Super! tu as ajouté un nouvel évènement");
      cy.contains("Mon evenement test").click();
      cy.contains("Dave Lopper");
      cy.contains("Mon evenement test");
      cy.contains("50 rue de la soif, 69000 LYON");
      cy.contains(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui, ullam hic dolor tempore harum quia? Minima autem quaerat, ab nulla possimus sapiente"
      );
      cy.contains("Au resto");
    });

    // it("delete a event", function () {
    //   cy.get('[data-cy="btnDelete"]').click();
    //   cy.contains("Etes-vous certain de vouloir supprimer");
    //   cy.get('[data-cy="validateBtn"]').click();
    //   cy.contains("Ton évènement est supprimé");
    //   cy.url().should("include", "/events");
    // });
  });
  // describe("without session", function () {
  //   it("impossible to accès page event", function () {
  //     cy.task("deleteAllUsers");
  //     cy.visit("/events");
  //     cy.url().should("include", "/login");
  //     cy.contains("S’identifier");
  //   });
  // });
});

// QUAND PAS LOGGU2 PAS ACCES + TESTER LE LISTING ET L4AFFICHAGE? TESTER SI Y A PAS D EVENENEMENT A VENIR .../
