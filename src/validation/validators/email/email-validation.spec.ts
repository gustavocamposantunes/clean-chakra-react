import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest";

import { EmailValidation } from "./email-validation";

import { InvalidFieldError } from "@/validation/errors";

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe("EmailValidation", () => {
  it("Should return error if email is invalid", () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.verb())
    expect(error).toEqual(new InvalidFieldError())
  })

  it("Should return falsy if email is valid", () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})