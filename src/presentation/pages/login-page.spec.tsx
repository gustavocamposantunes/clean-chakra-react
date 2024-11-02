import { describe, expect, it } from "vitest"

import { render, screen } from "../test/test-utils"


import { LoginPage } from "./login-page"

describe("LoginPage", () => {
  it("Should start with initial state", () => {
    render(<LoginPage />)
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
})