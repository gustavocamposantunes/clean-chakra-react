import { describe, it, vi } from "vitest"


import { SignUpPage } from "./signup-page"

import { Helper, render } from "@/presentation/test"

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



describe("SignupPage", () => {
  it("Should start with initial state", () => {
    const validationError = "Campo obrigatório"
    makeSut()
    Helper.testChildCount("error-wrap", 0)
    Helper.testButtonIsDisabled("submit-button", true)
    Helper.testStatusForField("name", validationError)
    Helper.testStatusForField("email", validationError)
    Helper.testStatusForField("password", validationError)
    Helper.testStatusForField("passwordConfirmation", validationError)
  })
})