import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { AddAccount } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteAddAccount = (): AddAccount => new RemoteAddAccount(makeApiUrl("/signup"), makeAxiosHttpClient())