import axios, { AxiosResponse } from "axios";

import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http";

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    let httpResponse: AxiosResponse

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data
      }
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}