import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { MinLengthValidation } from "./min-length-validation";

import { InvalidFieldError } from "@/validation/errors";

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe("MinLengthValidation", () => {
  it("Should return error if value is less then invalid", () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.string.alphanumeric(2) })
    expect(error).toEqual(new InvalidFieldError())
  })

  it("Should return falsy if value is valid", () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.string.alphanumeric(5) })
    expect(error).toBeFalsy()
  })

  it("Should return falsy if field does not exist in schema", () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.string.alphanumeric(5) })
    expect(error).toBeFalsy()
  })
})