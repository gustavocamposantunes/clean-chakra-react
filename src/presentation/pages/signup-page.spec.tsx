import { faker } from "@faker-js/faker"
import { afterEach, describe, it, vi } from "vitest"

import { SignUpPage } from "./signup-page"

import { cleanup, Helper, render, ValidationStub } from "@/presentation/test"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  render(
    <SignUpPage
      validation={validationStub}
    />
  )
}

describe("SignupPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.testChildCount("error-wrap", 0)
    Helper.testButtonIsDisabled("submit-button", true)
    Helper.testStatusForField("name", validationError)
    Helper.testStatusForField("email", validationError)
    Helper.testStatusForField("password", "Campo obrigatório")
    Helper.testStatusForField("passwordConfirmation", "Campo obrigatório")
  })

  it("Should show name error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("name")
    Helper.testStatusForField("name", validationError)
  })

  it("Should show email error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("email")
    Helper.testStatusForField("email", validationError)
  })
})