import axios from "axios";

import { HttpPostParams } from "@/data/protocols/http";



export class AxiosHttpClient<T> {
  async post (params: HttpPostParams<T>): Promise<void> {
    await axios(params.url)
  }
}