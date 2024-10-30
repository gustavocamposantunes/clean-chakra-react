import { faker } from "@faker-js/faker"
import axios from "axios"
import { describe, it, expect, vi } from "vitest";

import { AxiosHttpClient } from "./axios-http-client";

import { HttpPostParams } from "@/data/protocols/http";


vi.mock("axios")

const mockedAxios = axios

const makeSut = (): AxiosHttpClient<object> => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<object> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue
})

describe("AxiosHttpClient", () => {
  it("Should call axios with correct values", async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})