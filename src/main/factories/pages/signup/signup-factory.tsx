import React from "react"

import { makeSignUpValidation } from "./signup-validation-factory"

import { makeRemoteAddAccount } from "@/main/factories/usecases/add-account/remote-add-account-factory"
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory"
import { SignUpPage } from "@/presentation/pages"

export const makeSignUp: React.FC = () => {
  return (
    <SignUpPage 
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}