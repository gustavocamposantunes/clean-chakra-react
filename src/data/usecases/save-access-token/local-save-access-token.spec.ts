import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { LocalSaveAccessToken } from "./local-save-access-token";

import { SetStorageSpy } from "@/data/test/mock-storage";

type SutTypes = {
  setStorageSpy: SetStorageSpy
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe("LocalSaveAccessToken", () => {
  it("Should call SetStorage with correct value", async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.string.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})