import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/usecases"

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({ 
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}