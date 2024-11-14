import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols";

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}
  validate(value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }  
}