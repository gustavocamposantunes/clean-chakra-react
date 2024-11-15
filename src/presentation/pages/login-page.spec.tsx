import { faker } from "@faker-js/faker"
import { afterEach, describe, expect, it, vi } from "vitest"

import { LoginPage } from "./login-page"

import { InvalidCredentialsError } from "@/domain/errors"
import { Helper, render, screen, fireEvent, cleanup, waitFor } from "@/presentation/test"
import { AuthenticationSpy, SaveAccessTokenMock, ValidationStub } from "@/presentation/test"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {    
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  render(
    <LoginPage 
      validation={validationStub} 
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField("email", email)
  Helper.populateField("password", password)
  const form = screen.getByTestId("form")
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}


describe("LoginPage", () => {
  afterEach(cleanup)

  it("Should start with initial state", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.testChildCount("error-wrap", 0)
    Helper.testButtonIsDisabled("submit-button", true)
    Helper.testStatusForField("email", validationError)
    Helper.testStatusForField("password", validationError)
  })

  it("Should email error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("email")
    Helper.testStatusForField("email", validationError)
  })

  it("Should password error if Validation fails", () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField("password")
    Helper.testStatusForField("password", validationError)
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

  it("Should enable submit button if form is valid", () => {
    makeSut()
    Helper.populateField("email")
    Helper.populateField("password")
    Helper.testButtonIsDisabled("submit-button", false)
  })

  it("Should show spinner on submit", async () => {
    makeSut()
    await simulateValidSubmit()
    testElementExists("spinner")
  })

  it("Should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it("Should call Authentication only once", async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it("Should not call Authentication form is invalid", async () => {
    const validationError = faker.word.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it("Should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    vi.spyOn(authenticationSpy, "auth").mockRejectedValueOnce(error)
    await simulateValidSubmit()
    testElementText("main-error", error.message)
    Helper.testChildCount("error-wrap", 1)
  })

  it("Should calls SaveAccessToken on success", async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("Should present error if SaveAccessToken fails", async () => {
    const { saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    vi.spyOn(saveAccessTokenMock, "save").mockRejectedValueOnce(error)
    await simulateValidSubmit()
    testElementText("main-error", error.message)
    Helper.testChildCount("error-wrap", 1)
  })


  it("Should go to sign up page", () => {
    makeSut()
    const signup = screen.getByTestId("signup")
    fireEvent.click(signup)
    expect(mockNavigate).toHaveBeenCalledWith("/signup")

  })
})  