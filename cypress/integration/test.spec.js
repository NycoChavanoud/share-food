describe("testTest", function () {
  it("l'alerte doit s'afficher après le click", function () {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=submit]")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("click");
      });
  });
});
