import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { CompareFieldValidation } from "../compare-fields/compare-fields-validation";

import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder as sut } from "@/validation/validators";

describe("ValidationBuilder", () => {
  it("Should return RequiredFieldValidation", () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it("Should return EmailValidation", () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it("Should return MinLength", () => {
    const field = faker.database.column()
    const length = faker.number.int()
    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  it("Should return CompareFieldValidation", () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldValidation(field, fieldToCompare)])
  })

  it("Should a list of validations", () => {
    const field = faker.database.column()
    const length = faker.number.int()
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})