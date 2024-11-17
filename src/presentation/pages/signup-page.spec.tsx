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
    Helper.testStatusForField("password", validationError)
    Helper.testStatusForField("passwordConfirmation", validationError)
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

  it("Should show password error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("password")
    Helper.testStatusForField("password", validationError)
  })

  it("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("passwordConfirmation")
    Helper.testStatusForField("passwordConfirmation", validationError)
  })

  it("Should show valid name state if Validation succeds", () => {
    makeSut()
    Helper.populateField("name")
    Helper.testStatusForField("name")
  })

  it("Should show valid email state if Validation succeds", () => {
    makeSut()
    Helper.populateField("email")
    Helper.testStatusForField("email")
  })
})