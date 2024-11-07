import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { ValidationComposite } from "./validation-composite"

import { FieldValidationSpy } from "@/validation/test/mock-field-validation"

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe("ValidationComposite", () => {
  it("Should return error if any validation fails", () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.word.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.word.words())
    const error = sut.validate(fieldName, faker.word.sample())
    expect(error).toBe(errorMessage)
  })

  it("Should return falsy validation works", () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.word.sample())
    expect(error).toBeFalsy()
  })
})