import { FieldValidation } from "@/validation/protocols"

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly field: string) {}
  validate(value: string): Error {
    return value ? this.error : null
  }
} 