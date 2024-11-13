import { faker } from "@faker-js/faker"
import { beforeEach, describe, expect, it } from "vitest"

import "vitest-localstorage-mock"
import { LocalStorageAdapter } from "./loca-storage-adapter"

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear()
  }) 

  it("Should call localStorage with correct values", async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.string.uuid()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})