import { faker } from "@faker-js/faker"
import { afterEach, describe, it, vi } from "vitest"

import { SignUpPage } from "./signup-page"

import { cleanup, fireEvent, Helper, render, screen, ValidationStub } from "@/presentation/test"

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

const populateField = (
  fieldName: string,
  value = faker.internet.username()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.change(input, { target: { value: value } })
}

describe("SignupPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.testChildCount("error-wrap", 0)
    Helper.testButtonIsDisabled("submit-button", true)
    Helper.testStatusForField("name", validationError)
    Helper.testStatusForField("email", "Campo obrigatório")
    Helper.testStatusForField("password", "Campo obrigatório")
    Helper.testStatusForField("passwordConfirmation", "Campo obrigatório")
  })

  it("Should show name error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    populateField("name")
    Helper.testStatusForField("name", validationError)
  })
})