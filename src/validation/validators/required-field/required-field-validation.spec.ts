import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { RequiredFieldValidation } from "./required-field-validation";

import { RequiredFieldError } from "@/validation/errors";

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe("RequiredFieldValidation", () => {
  it("Should return error if field is empty", () => {
    const field = faker.database.column()
    const sut =  makeSut(field)
    const error = sut.validate({[field]: ""})
    expect(error).toEqual(new RequiredFieldError()) 
  })

  it("Should return false if field is not empty", () => {
    const field = faker.database.column()
    const sut = makeSut(field)   
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toBeFalsy()
  })
})