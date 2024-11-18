import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { EmailValidation } from "./email-validation";

import { InvalidFieldError } from "@/validation/errors";

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe("EmailValidation", () => {
  it("Should return error if email is invalid", () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.verb() })
    expect(error).toEqual(new InvalidFieldError())
  })

  it("Should return falsy if email is valid", () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  it("Should return falsy if email is empty", () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: "" })
    expect(error).toBeFalsy()
  })
})