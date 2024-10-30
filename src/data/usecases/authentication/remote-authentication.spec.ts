import { describe, it, expect } from "vitest"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"
import { faker } from "@faker-js/faker"

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
    sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})