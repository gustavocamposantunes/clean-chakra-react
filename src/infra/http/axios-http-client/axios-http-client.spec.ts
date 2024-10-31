import { faker } from "@faker-js/faker"
import axios from "axios"
import { describe, it, expect, vi } from "vitest"

import { AxiosHttpClient } from "./axios-http-client"

import { HttpPostParams } from "@/data/protocols/http"

vi.mock("axios")

const mockedAxios = axios

const { mock } = vi.mocked(axios, true).post.mockResolvedValue({
  data: faker.helpers.objectValue,
  status: faker.number.int()
})

const makeSut = (): AxiosHttpClient<object, object> => {
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

  it("Should return the correct statusCode and body", () => {
    const sut = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mock.results[0].value)
  })
})