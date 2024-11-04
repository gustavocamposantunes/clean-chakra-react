import { faker } from "@faker-js/faker"
import { afterEach, describe, expect, it } from "vitest"

import { render, screen, fireEvent, cleanup } from "../test/test-utils"

import { LoginPage } from "./login-page"

import { ValidationStub } from "@/presentation/test"

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {    
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.word.words()
  render(<LoginPage validation={validationStub} />)

  return {
    validationStub
  }
}

describe("LoginPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const { validationStub } = makeSut()
    const error = screen.getByTestId("error-wrap")
    expect(error.childElementCount).toBe(0)
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe("🔴")
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  it("should email error if Validation fails", () => {
    const { validationStub } = makeSut()
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe("🔴")
  })

  it("should password error if Validation fails", () => {
    const { validationStub } = makeSut()
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  it("should show valid password state if Validation succeds", () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = screen.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.change(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe("Tudo certo")
    expect(emailStatus.textContent).toBe("🟢")
  })

  it("should show valid password state if Validation succeds", () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = screen.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.change(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe("Tudo certo")
    expect(passwordStatus.textContent).toBe("🟢")
  })
})