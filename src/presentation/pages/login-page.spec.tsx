import { faker } from "@faker-js/faker"
import { afterEach, describe, expect, it } from "vitest"

import { render, screen, fireEvent, cleanup } from "../test/test-utils"

import { LoginPage } from "./login-page"

import { AuthenticationSpy, ValidationStub } from "@/presentation/test"

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {    
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(<LoginPage validation={validationStub} authentication={authenticationSpy} />)

  return {
    authenticationSpy
  }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(email)
  populatePasswordField(password)
  const submitButton = screen.getByTestId("submit-button")
  fireEvent.click(submitButton)
}

const populateEmailField = (
  email = faker.internet.email(),
): void => {
  const emailInput = screen.getByTestId("email")
  fireEvent.change(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  password = faker.internet.password()
): void => {
  const passwordInput = screen.getByTestId("password")
  fireEvent.change(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const field = screen.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || "Tudo certo")
  expect(field.textContent).toBe(validationError ? "🔴" : "🟢")
}

describe("LoginPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    const error = screen.getByTestId("error-wrap")
    expect(error.childElementCount).toBe(0)
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
    simulateStatusForField("email", validationError)
    simulateStatusForField("password", validationError)
  })

  it("Should email error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    populateEmailField()
    simulateStatusForField("email", validationError)
  })

  it("Should password error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    populatePasswordField()
    simulateStatusForField("password", validationError)
  })

  it("Should show valid password state if Validation succeds", () => {
    makeSut()
    populateEmailField()
    simulateStatusForField("email")
  })

  it("Should show valid password state if Validation succeds", () => {
    makeSut()
    populatePasswordField()
    simulateStatusForField("password")
  })

  it("Should enable submit button if form is valid", () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })

  it("Should show spinner on submit", () => {
    makeSut()
    simulateValidSubmit()
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toBeTruthy()
  })

  it("Should call Authentication with correct values", () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})