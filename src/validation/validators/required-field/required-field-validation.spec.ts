import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { RequiredFieldValidation } from "./required-field-validation";

import { RequiredFieldError } from "@/validation/errors";

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe("RequiredFieldValidation", () => {
  it("Should return error if field is empty", () => {
    const sut =  makeSut()
    const error = sut.validate("")
    expect(error).toEqual(new RequiredFieldError()) 
  })

  it("Should return false if field is not empty", () => {
    const sut = makeSut()   
    const error = sut.validate(faker.word.words())
    expect(error).toBeFalsy()
  })
})