import { afterEach, describe, expect, it } from "vitest"

import { render, screen, fireEvent, cleanup } from "../test/test-utils"

import { LoginPage } from "./login-page"

import { Validation } from "@/presentation/protocols/validation"



type SutTypes = {
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}


const makeSut = (): SutTypes => {    
  const validationSpy = new ValidationSpy()
  render(<LoginPage validation={validationSpy} />)

  return {
    validationSpy
  }
}

describe("LoginPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    makeSut()
    const error = screen.getByTestId("error-wrap")
    expect(error.childElementCount).toBe(0)
    const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
    const emailStatus = screen.getByTestId("email-status")
    expect(emailStatus.title).toBe("Campo obrigatório")
    expect(emailStatus.textContent).toBe("🔴")
    const passwordStatus = screen.getByTestId("password-status")
    expect(passwordStatus.title).toBe("Campo obrigatório")
    expect(passwordStatus.textContent).toBe("🔴")
  })

  it("should call Validation with correct email", () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId("email")
    fireEvent.change(emailInput, { target: { value: "any_email" } })
    expect(validationSpy.input).toEqual({
      email: "any_email"
    })
  })

  it("should call Validation with correct password", () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId("password")
    fireEvent.change(passwordInput, { target: { value: "any_password" } })
    expect(validationSpy.input).toEqual({
      password: "any_password"
    })
  })
})