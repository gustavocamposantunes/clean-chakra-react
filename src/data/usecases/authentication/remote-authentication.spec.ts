import { faker } from "@faker-js/faker"
import { describe, it, expect } from "vitest"

import { RemoteAuthentication } from "./remote-authentication"

import { HttpPostClientSpy } from "@/data/test/mock-http-client"
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
  it("Should call HttpPostClient with correct URL", () => {
    
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it("Should call HttpPostClient with correct body", () => {
    
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})