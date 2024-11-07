import { describe, expect, it } from "vitest";

import { RequiredFieldValidation, ValidationBuilder as sut } from "@/validation/validators";

describe("ValidationBuilder", () => {
  it("Should return RequiredFieldValidation", () => {
    const validations = sut.field("any_field").required().build()
    expect(validations).toEqual([new RequiredFieldValidation("any_field")])
  })
})