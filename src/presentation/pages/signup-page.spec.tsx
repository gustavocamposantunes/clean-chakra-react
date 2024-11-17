import { faker } from "@faker-js/faker"
import { afterEach, describe, expect, it, vi } from "vitest"

import { SignUpPage } from "./signup-page"

import { EmailInUseError } from "@/domain/errors"
import { AddAccountSpy, cleanup, fireEvent, Helper, render, SaveAccessTokenMock, screen, ValidationStub, waitFor } from "@/presentation/test"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

type SutTypes = {
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError

  render(
    <SignUpPage
      validation={validationStub}
      addAccount={addAccountSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  name = faker.internet.displayName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField("name", name)
  Helper.populateField("email", email)
  Helper.populateField("password", password)
  Helper.populateField("passwordConfirmation", password)
  const form = screen.getByTestId("form")
  fireEvent.submit(form)
  await waitFor(() => form)
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

  it("Should show valid password state if Validation succeds", () => {
    makeSut()
    Helper.populateField("password")
    Helper.testStatusForField("password")
  })

  it("Should show valid passwordConfirmation state if Validation succeds", () => {
    makeSut()
    Helper.populateField("passwordConfirmation")
    Helper.testStatusForField("passwordConfirmation")
  })

  it("Should enable submit button if form is valid", () => {
    makeSut()
    Helper.populateField("name")
    Helper.populateField("email")
    Helper.populateField("password")
    Helper.populateField("passwordConfirmation")
    Helper.testButtonIsDisabled("submit-button", false)
  })

  it("Should show spinner on submit", async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists("spinner")
  })

  it("Should call AddAccount with correct values", async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.internet.displayName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it("Should not call AddAccount form is invalid", async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it("Should not call Authentication form is invalid", async () => {
    const validationError = faker.word.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  it("Should present error if AddAccount fails", async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    vi.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testElementText("main-error", error.message)
    Helper.testChildCount("error-wrap", 1)
  })

  it("Should calls SaveAccessToken on success", async () => {
    const { addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })
})