import { faker } from "@faker-js/faker"

describe("Login", () => {
  beforeEach(() => {
    cy.visit("login")
  })

  it("Shuld load with correct initial state", () => {
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴")
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Shuld present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.word.words())
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo inválido")
      .should("contain.text", "🔴")
    cy.getByTestId("password").type(faker.string.alphanumeric(3))
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo inválido")
      .should("contain.text", "🔴")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Shuld present valid state if form is valid", () => {
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo")
      .should("contain.text", "🟢")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo")
      .should("contain.text", "🟢")
    cy.getByTestId("submit-button").should("not.have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })
})