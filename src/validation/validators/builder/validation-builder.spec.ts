import { describe, expect, it } from "vitest";

import { EmailValidation, RequiredFieldValidation, ValidationBuilder as sut } from "@/validation/validators";

describe("ValidationBuilder", () => {
  it("Should return RequiredFieldValidation", () => {
    const validations = sut.field("any_field").required().build()
    expect(validations).toEqual([new RequiredFieldValidation("any_field")])
  })

  it("Should return EmailValidation", () => {
    const validations = sut.field("any_field").email().build()
    expect(validations).toEqual([new EmailValidation("any_field")])
  })
})