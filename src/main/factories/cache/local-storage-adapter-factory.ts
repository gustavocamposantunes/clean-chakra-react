import { SetStorage } from "@/data/protocols/cache/set-storage"
import { LocalStorageAdapter } from "@/infra/cache/loca-storage-adapter"

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter()