import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { MinLengthValidation } from "./min-length-validation";

import { InvalidFieldError } from "@/validation/errors";

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe("MinLengthValidation", () => {
  it("Should return error if value is less then invalid", () => {
    const sut = makeSut()
    const error = sut.validate(faker.string.alphanumeric(2))
    expect(error).toEqual(new InvalidFieldError())
  })

  it("Should return falsy if value is valid", () => {
    const sut = makeSut()
    const error = sut.validate(faker.string.alphanumeric(5))
    expect(error).toBeFalsy()
  })
})