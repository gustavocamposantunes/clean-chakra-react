import React from "react"

import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory"

import { makeLoginValidation } from "./login-validation-factory"

import { LoginPage } from "@/presentation/pages"

export const makeLogin: React.FC = () => {
  return (
    <LoginPage 
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}