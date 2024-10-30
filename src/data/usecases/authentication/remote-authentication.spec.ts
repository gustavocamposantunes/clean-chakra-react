import { describe, it, expect } from "vitest"
import { HttpPostClient } from "@/data/protocols/http/http-post-client"
import { RemoteAuthentication } from "./remote-authentication"

describe("RemoteAuthentication", () => {
  it("Should call HttpPostClient with correct URL", () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
      }
    }
    const url = 'any_url'
    const httpClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClient)
    sut.auth()

    expect(httpClient.url).toBe(url)
  })
})