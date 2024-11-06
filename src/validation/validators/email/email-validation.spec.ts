import { describe, expect, it } from "vitest";

import { EmailValidation } from "./email-validation";

import { InvalidFieldError } from "@/validation/errors";

describe("EmailValidation", () => {
  it("Should return error if email is invalid", () => {
    const sut = new EmailValidation("email")
    const error = sut.validate("")
    expect(error).toEqual(new InvalidFieldError())
  })
})