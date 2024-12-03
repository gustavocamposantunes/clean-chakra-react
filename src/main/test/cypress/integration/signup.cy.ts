import { faker } from "@faker-js/faker"

import * as FormHelper from "../support/form-helper"

describe("Login", () => {
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
})