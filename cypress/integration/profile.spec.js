describe("profile", function () {
  describe("withoutSession", function () {
    it("impossible to acces profile", function () {
      cy.task("deleteAllUsers");
      cy.visit("/profile/me");
      cy.url().should("include", "/login");
    });
  });
  describe("withSession", function () {
    beforeEach(() => {
      cy.task("deleteAllUsers");
      cy.setupCurrentUser();
    });

    it("the current user info are available", function () {
      cy.visit("/profile/me");
      cy.contains("Dave Lopper");
      cy.contains("08 juin 1982");
      cy.contains("Lyon");
      cy.contains("pastaBox");
      cy.contains(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!"
      );
    });

    it("can acces to edit page", function () {
      cy.visit("/profile/me");
      cy.get('[data-cy="editLink"]').click();
      cy.url().should("include", "/profile/edit");
    });

    it.only("can edit my profil", function () {
      cy.visit("/profile/edit");
      cy.get("[data-cy='firstname']").type("Pepito");
      cy.get("[data-cy='lastname']").type("Mi Corazon");
      cy.get("[data-cy='nickName']").type("King Biscuit");
      cy.get("[data-cy='birthday']").type("1990-05-01", { force: true });
      cy.get("[data-cy='city']").type("Mexico");
      cy.get("[data-cy='favoritePlate']").type("Tacos");
      cy.get("[data-cy='description']").type("Je change ma desription");
      cy.get('[data-cy="formEditProfile"]').submit();
      cy.url().should("include", "/profile/me");
      cy.contains("Pepito");
      cy.contains("Mi Corazon");
      cy.contains("King Biscuit");
      cy.contains("Mexico");
      cy.contains("Tacos");
      cy.contains("01 mai");
      cy.contains("Je change ma desription");
    });

    it("can delete my profil/account", function () {
      cy.visit("/profile/edit");
      cy.get('[data-cy="deleteQuestion"]').click();
      cy.get('[data-cy="btnDelete"]').click();
      cy.contains("Etes-vous certain de vouloir supprimer votre compte");
      cy.get('[data-cy="validateBtn"]').click();
      cy.url().should("include", "/");
    });
  });
});
