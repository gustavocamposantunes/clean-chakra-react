import { faker } from "@faker-js/faker"
import { describe, it, expect } from "vitest"

import { RemoteAuthentication } from "./remote-authentication"

import { HttpStatusCode } from "@/data/protocols/http/http-response"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { mockAuthentication } from "@/domain/test/mock-authentication"

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe("RemoteAuthentication", () => {
  it("Should call HttpPostClient with correct URL", async () => {
    
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it("Should call HttpPostClient with correct body", async () => {    
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})