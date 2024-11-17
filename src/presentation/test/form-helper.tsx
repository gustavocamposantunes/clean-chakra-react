import { faker } from "@faker-js/faker"
import { expect } from "vitest"

import { fireEvent, screen } from "@/presentation/test/test-utils"

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || "Tudo certo")
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢")
}

export const populateField = (
  fieldName: string,
  value = faker.internet.username()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.change(input, { target: { value: value } })
}