import { describe, it, vi, expect } from "vitest"

import { render, screen } from "../test/test-utils"

import { SignUpPage } from "./signup-page"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

const makeSut = () => {
  render(
    <SignUpPage />
  )
}

const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || "Tudo certo")
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢")
}

describe("SignupPage", () => {
  it("Should start with initial state", () => {
    const validationError = "Campo obrigatório"
    makeSut()
    testChildCount("error-wrap", 0)
    testButtonIsDisabled("submit-button", true)
    testStatusForField("name", validationError)
    testStatusForField("email", validationError)
    testStatusForField("password", validationError)
    testStatusForField("passwordConfirmation", validationError)
  })
})