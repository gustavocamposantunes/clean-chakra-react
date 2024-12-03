import { faker } from "@faker-js/faker"
import { Method } from "axios"

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      message: faker.word.words()
    }
  }).as("request")
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 403,
    body: {
      message: faker.word.words()
    }
  }).as("request")
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: 400,
    body: {
      message: faker.word.words()
    }
  }).as("request")
}

export const mockOk = (url: RegExp, method: Method, body: object, delay?: number): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    delay,
    body
  }).as("request")
}

