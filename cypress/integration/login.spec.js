const { idText, createYield } = require("typescript");

describe("login", function () {
  idText("se logger dans un formulaire simple", function () {
    cy.visit("http://localhost:3000/login");
  });
});
