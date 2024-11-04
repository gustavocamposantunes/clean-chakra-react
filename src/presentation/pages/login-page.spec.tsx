import { faker } from "@faker-js/faker"
import { afterEach, describe, expect, it } from "vitest"

import { render, screen, fireEvent, cleanup } from "../test/test-utils"

import { LoginPage } from "./login-page"

import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"
import { ValidationStub } from "@/presentation/test"

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

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

describe("LoginPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    const error = screen.getByTestId("error-wrap")
    expect(error.childElementCount).toBe(0)
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe("🔴")
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  it("Should email error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe("🔴")
  })

  it("Should password error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  it("Should show valid password state if Validation succeds", () => {
    makeSut()
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe("Tudo certo")
    expect(emailStatus.textContent).toBe("🟢")
  })

  it("Should show valid password state if Validation succeds", () => {
    makeSut()
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe("Tudo certo")
    expect(passwordStatus.textContent).toBe("🟢")
  })

  it("Should enable submit button if form is valid", () => {
    makeSut()
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })

  it("Should show spinner on submit", () => {
    makeSut()
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const submitButton = screen.getByTestId("submit-button")
    fireEvent.click(submitButton)
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toBeTruthy()
  })

  it("Should call Authentication with correct values", () => {
    const { authenticationSpy } = makeSut()
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const submitButton = screen.getByTestId("submit-button")
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})