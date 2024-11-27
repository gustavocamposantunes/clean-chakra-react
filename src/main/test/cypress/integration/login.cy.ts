import { faker } from "@faker-js/faker"

import * as FormHelper from "../support/form-helper"

import * as Http from "./login-mocks"

const simulateValidSubmit = (): void => {
  cy.getByTestId("email").type(faker.internet.email())
  cy.getByTestId("password").type(faker.string.alphanumeric(6))
  cy.getByTestId("submit-button").click()
}

describe("Login", () => {
  beforeEach(() => {
    cy.visit("login")
  })

  it("Should load with correct initial state", () => {
    FormHelper.testInputStatus("email", "Campo obrigatório")
    FormHelper.testInputStatus("password", "Campo obrigatório")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.word.words())
    FormHelper.testInputStatus("email", "Campo inválido")
    cy.getByTestId("password").type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus("password", "Campo inválido")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").type(faker.internet.email())
    FormHelper.testInputStatus("email")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    FormHelper.testInputStatus("password")
    cy.getByTestId("submit-button").should("not.have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present InvalidCredentialsError on 401", () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testInputStatus("email")
    FormHelper.testInputStatus("password")
    cy.getByTestId("error-wrap")
    FormHelper.testMainError("Credenciais inválidas")
    FormHelper.testUrl("/login")
  })

  it("Should present UnexpectedError on 400", () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testInputStatus("email")
    FormHelper.testInputStatus("password")
    cy.getByTestId("error-wrap")
    FormHelper.testMainError("Erro inesperado. Tente novamente em breve!")
    FormHelper.testUrl("/login")
  })

  it("Should present UnexpectedError if invalid data is returned", () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testInputStatus("email")
    FormHelper.testInputStatus("password")
    cy.getByTestId("error-wrap")
    FormHelper.testMainError("Erro inesperado. Tente novamente em breve!")
    FormHelper.testUrl("/login")
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
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
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