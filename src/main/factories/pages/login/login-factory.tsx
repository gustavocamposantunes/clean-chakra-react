import React from "react"

import { makeLoginValidation } from "./login-validation-factory"

import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory"
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory"
import { LoginPage } from "@/presentation/pages"

export const makeLogin: React.FC = () => {
  return (
    <LoginPage 
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}