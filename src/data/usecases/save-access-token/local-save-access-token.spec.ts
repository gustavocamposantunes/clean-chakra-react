import { faker } from "@faker-js/faker";
import { describe, expect, it, vi } from "vitest";

import { LocalSaveAccessToken } from "./local-save-access-token";

import { SetStorageMock } from "@/data/test/mock-storage";
import { UnexpectedError } from "@/domain/errors";

type SutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe("LocalSaveAccessToken", () => {
  it("Should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.string.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  it("Should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut()
    vi.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.string.uuid())
    expect(promise).rejects.toThrow(new Error())
  })

  it("Should throw if accessToken is falsy", async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})