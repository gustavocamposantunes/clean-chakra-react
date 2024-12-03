import { faker } from "@faker-js/faker"

import * as FormHelper from "../support/form-helper"
import * as Http from "../support/signup-mocks"

const populateFields = (): void => {
  cy.getByTestId("name").type(faker.string.alphanumeric(6))
  cy.getByTestId("email").type(faker.internet.email())
  const password = faker.string.alphanumeric(6)
  cy.getByTestId("password").type(password)
  cy.getByTestId("passwordConfirmation").type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId("submit-button").click()
}

describe("Signup", () => {
  beforeEach(() => {
    cy.visit("signup")
  })

  it("Should load with correct initial state", () => {
    FormHelper.testInputStatus("name", "Campo obrigatório")
    FormHelper.testInputStatus("email", "Campo obrigatório")
    FormHelper.testInputStatus("password", "Campo obrigatório")
    FormHelper.testInputStatus("passwordConfirmation", "Campo obrigatório")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("name").type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus("name", "Campo inválido")
    cy.getByTestId("email").type(faker.word.words())
    FormHelper.testInputStatus("email", "Campo inválido")
    cy.getByTestId("password").type(faker.string.alphanumeric(3)) 
    FormHelper.testInputStatus("password", "Campo inválido")
    cy.getByTestId("passwordConfirmation").type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus("passwordConfirmation", "Campo inválido")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("name").type(faker.string.alphanumeric(6))
    FormHelper.testInputStatus("name")
    cy.getByTestId("email").type(faker.internet.email())
    FormHelper.testInputStatus("email")
    const password = faker.string.alphanumeric(6)
    cy.getByTestId("password").type(password)
    FormHelper.testInputStatus("password")
    cy.getByTestId("passwordConfirmation").type(password)
    FormHelper.testInputStatus("passwordConfirmation")
    cy.getByTestId("submit-button").should("not.have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present EmailInUseError on 403", () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError("Esse email já está em uso")
    FormHelper.testUrl("/signup")
  })

  it("Should present UnexpectedError on 400", () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError("Erro inesperado. Tente novamente em breve!")
    FormHelper.testUrl("/signup")
  })

  it("Should present UnexpectedError if invalid data is returned", () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError("Erro inesperado. Tente novamente em breve!")
    FormHelper.testUrl("/signup")
  })

  it("Should save accessToken if valid credentials are provided", () => {
    Http.mockOk()
    simulateValidSubmit()
    cy.getByTestId("spinner").should("not.exist")
    FormHelper.testUrl("/")
    FormHelper.testLocalStorageItem("accessToken")
  })

  it("Should prevent multiple submits", () => {
    Http.mockOk(2000)
    populateFields()
    cy.getByTestId("submit-button").click()
    cy.getByTestId("submit-button").click()
    FormHelper.testHttpCallsCount(1)
  })

  it("Should not call submit if form is invalid", () => {
    Http.mockOk()
    cy.getByTestId("email").type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  })
})