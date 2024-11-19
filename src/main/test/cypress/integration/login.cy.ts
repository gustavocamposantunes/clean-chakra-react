import { faker } from "@faker-js/faker"

const baseUrl = Cypress.config().baseUrl
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

  it("Shuld present error if invalid credentials are invalid", () => {
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo")
      .should("contain.text", "🟢")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo")
      .should("contain.text", "🟢")
    cy.getByTestId("submit-button").click()
    cy.getByTestId("error-wrap")
      .getByTestId("spinner").should("exist")
      .getByTestId("main-error").should("not.exist")
      .getByTestId("spinner").should("not.exist")
      .getByTestId("main-error").should("contain.text", "Credenciais inválidas")
    cy.url().should("eq", `${baseUrl}/login`)
  })
})