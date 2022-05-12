describe("profile", function () {
  describe("withoutSession", function () {
    it("impossible to acces profile", function () {
      cy.task("deleteAllUsers");
      cy.visit("/profile");
      cy.url().should("include", "/login");
    });
  });
  describe("withSession", function () {
    beforeEach(() => {
      cy.task("deleteAllUsers");
      cy.setupCurrentUser();
    });

    it("the current user info are available", function () {
      cy.visit("/profile");
      cy.contains("Dave Lopper");
      cy.contains("08 juin 1982");
      cy.contains("Lyon");
      cy.contains("pastaBox");
      cy.contains(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!"
      );
    });

    it("does show the update button on the current user profil", function () {
      cy.visit("/profile");
    });
  });
});
