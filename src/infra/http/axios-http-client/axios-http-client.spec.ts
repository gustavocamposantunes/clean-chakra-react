import { faker } from "@faker-js/faker"
import axios from "axios"
import { describe, it, expect, vi } from "vitest";

import { AxiosHttpClient } from "./axios-http-client";


vi.mock("axios")

const mockedAxios = axios

describe("AxiosHttpClient", () => {
  it("Should call axios with correct URL", async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})