import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { CompareFieldValidation } from "./compare-fields-validation";

import { InvalidFieldError } from "@/validation/errors";

const makeSut = (valueToCompare: string): CompareFieldValidation => new CompareFieldValidation(faker.database.column(), valueToCompare)

describe("CompareFieldValidation", () => {
  it("Should return error if compare is invalid", () => {
    const sut =  makeSut(faker.word.words())
    const error = sut.validate(faker.word.words())
    expect(error).toEqual(new InvalidFieldError()) 
  })
})