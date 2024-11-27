import { faker } from "@faker-js/faker"

const baseUrl = Cypress.config().baseUrl
describe("Login", () => {
  beforeEach(() => {    
    cy.visit("login")
  })

  it("Should load with correct initial state", () => {
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "invalid")
    cy.getByTestId("email").should("have.attr", "title", "Campo obrigatório")
    cy.getByTestId("email-label").should("have.attr", "title", "Campo obrigatório")
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "invalid")
    cy.getByTestId("password").should("have.attr", "title", "Campo obrigatório")
    cy.getByTestId("password-label").should("have.attr", "title", "Campo obrigatório")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.word.words())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "invalid")
    cy.getByTestId("email-label").should("have.attr", "title", "Campo inválido")
    cy.getByTestId("email").should("have.attr", "title", "Campo inválido")
    cy.getByTestId("password").type(faker.string.alphanumeric(3))
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "invalid")
    cy.getByTestId("password-label").should("have.attr", "title", "Campo inválido")
    cy.getByTestId("password").should("have.attr", "title", "Campo inválido")
    cy.getByTestId("submit-button").should("have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("email").should("not.have.attr", "title")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("password").should("not.have.attr", "title")
    cy.getByTestId("submit-button").should("not.have.attr", "disabled")
    cy.getByTestId("error-wrap").should("not.have.descendants")
  })

  it("Should present InvalidCredentialsError on 401", () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        message: faker.word.words()
      }
    })
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("email").should("not.have.attr", "title")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("password").should("not.have.attr", "title")
    cy.getByTestId("submit-button").click()
    cy.getByTestId("error-wrap")
      .getByTestId("spinner").should("not.exist")
      .getByTestId("main-error").should("contain.text", "Credenciais inválidas")
    cy.url().should("eq", `${baseUrl}/login`)
  })

  it("Should present UnexpectedError on 400", () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: {
        message: faker.word.words()
      }
    })
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("email").should("not.have.attr", "title")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("password").should("not.have.attr", "title")
    cy.getByTestId("submit-button").click()
    cy.getByTestId("error-wrap")
      .getByTestId("spinner").should("not.exist")
      .getByTestId("main-error").should("contain.text", "Erro inesperado. Tente novamente em breve!")
    cy.url().should("eq", `${baseUrl}/login`)
  })

  it("Should present UnexpectedError if invalid data is returned", () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        message: faker.word.words()
      }
    })
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("email").should("not.have.attr", "title")
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("password-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("password").should("not.have.attr", "title")
    cy.getByTestId("submit-button").click()
    cy.getByTestId("error-wrap")
      .getByTestId("spinner").should("not.exist")
      .getByTestId("main-error").should("contain.text", "Erro inesperado. Tente novamente em breve!")
    cy.url().should("eq", `${baseUrl}/login`)
  })

  it("Should save accessToken if valid credentials are provided", () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.word.words()
      }
    })
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("email-wrap").should("have.attr", "data-status", "valid")
    cy.getByTestId("email").should("not.have.attr", "title")
    cy.getByTestId("password").type(faker.string.alphanumeric(6)).type('{enter}')
    cy.getByTestId("main-error").should("not.exist")
    cy.getByTestId("spinner").should("not.exist")
    cy.url().should("eq", `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem("accessToken")))
  })

  it("Should prevent multiple submits", () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      delay: 2000,
      body: {
        accessToken: faker.word.words()
      }
    }).as("request")
    cy.getByTestId("email").type(faker.internet.email())
    cy.getByTestId("password").type(faker.string.alphanumeric(6))
    cy.getByTestId("submit-button").click()
    cy.getByTestId("submit-button").click()
    cy.get("@request.all").should("have.length", 1)
  })

  it("Should not call submit if form is invalid", () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.word.words()
      }
    }).as("request")
    cy.getByTestId("email").type(faker.internet.email()).type('{enter}')
    cy.get("@request.all").should("have.length", 0)
  })
})