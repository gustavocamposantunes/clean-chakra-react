import { faker } from "@faker-js/faker"
import axios from "axios"
import { describe, it, expect, vi, beforeEach } from "vitest"

import { AxiosHttpClient } from "./axios-http-client"

import { mockPostRequest } from "@/data/test"
import { mockHttpResponse } from "@/infra/test"

vi.mock("axios")

const mockedAxios = vi.mocked(axios, true)

const makeSut = (): AxiosHttpClient<object, object> => {
  return new AxiosHttpClient()
}

describe("AxiosHttpClient", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({
      data: faker.helpers.objectValue,
      status: faker.number.int()
    })
  })
  it("Should call axios with correct values", async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it("Should return the correct statusCode and body", () => {
    const sut = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  it("Should return the correct statusCode and body on failure", () => {
    const sut = makeSut();
    
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    });

    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
})