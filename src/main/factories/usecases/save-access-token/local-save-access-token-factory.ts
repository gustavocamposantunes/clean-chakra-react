import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory";

import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { SaveAccessToken } from "@/domain/usecases";

export const makeLocalSaveAccessToken = (): SaveAccessToken => new LocalSaveAccessToken(makeLocalStorageAdapter())
