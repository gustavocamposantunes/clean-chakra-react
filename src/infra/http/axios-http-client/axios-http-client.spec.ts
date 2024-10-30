import { faker } from "@faker-js/faker"
import axios from "axios"
import { describe, it, expect, vi } from "vitest";

import { AxiosHttpClient } from "./axios-http-client";


vi.mock("axios")

const mockedAxios = axios

const makeSut = (): AxiosHttpClient<object> => {
  return new AxiosHttpClient()
}

describe("AxiosHttpClient", () => {
  it("Should call axios with correct URL", async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})