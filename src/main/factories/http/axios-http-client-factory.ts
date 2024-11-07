import { AccountModel } from "@/domain/models"
import { AuthenticationParams } from "@/domain/usecases"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"

export const makeAxiosHttpClient = (): AxiosHttpClient<AuthenticationParams, AccountModel> => {
  return new AxiosHttpClient<AuthenticationParams, AccountModel>()
}