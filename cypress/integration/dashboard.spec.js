describe("dashboard", function () {
  describe("withoutSession", function () {
    it("impossible to acces dashboard", function () {
      cy.task("deleteAllUsers");
      cy.visit("/dashboard");
      cy.url().should("include", "/login");
    });
  });
  describe("withSession", function () {
    beforeEach(() => {
      cy.task("deleteAllUsers");
      cy.setupCurrentUser();
    });

    it("access to the dashboard with navbar", function () {
      cy.visit("/");
      cy.get('[data-cy="logoHome"]').click();
      cy.url().should("include", "/dashboard");
    });

    it("accès to the profile with profilCard", function () {
      cy.visit("/dashboard");
      cy.contains("Lyon");
      cy.contains("Voir son profil").click();
      cy.url().should("include", "/profile/me");
    });
  });
});
