import { describe, expect, it } from "vitest"

import { render, screen } from "../test/test-utils"


import { LoginPage } from "./login-page"

describe("LoginPage", () => {
  it("Should not render spinner and error on start", () => {
    render(<LoginPage />)

    const error = screen.getByTestId("error-wrap")

    expect(error.childElementCount).toBe(0)
  })
})