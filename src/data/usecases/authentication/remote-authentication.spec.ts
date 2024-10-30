import { describe, it, expect } from "vitest"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"

describe("RemoteAuthentication", () => {
  it("Should call HttpPostClient with correct URL", () => {
    
    const url = 'any_url'
    const httpClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClient)
    sut.auth()

    expect(httpClient.url).toBe(url)
  })
})