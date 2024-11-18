import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { CompareFieldValidation } from "./compare-fields-validation"

import { InvalidFieldError } from "@/validation/errors"

const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe("CompareFieldValidation", () => {
  it("Should return error if compare is invalid", () => {
    const field = faker.database.column()
    const fieldToCompare = faker.word.words()
    const sut =  makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.word.words(),
      [fieldToCompare]: faker.word.words()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  it("Should return falsy if compare is valid", () => {
    const field = faker.database.column()
    const fieldToCompare = faker.word.words()
    const value = faker.internet.password()
    const sut =  makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})