import React from "react"

import { RemoteAuthentication } from "@/data/usecases/authentication"
import { AccountModel } from "@/domain/models"
import { AuthenticationParams } from "@/domain/usecases"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import { LoginPage } from "@/presentation/pages"
import { ValidationBuilder as Builder, ValidationComposite } from "@/validation/validators"

export const makeLogin: React.FC = () => {
  const url = "http://localhost:3000/api/login"
  const axiosHttpClient = new AxiosHttpClient<AuthenticationParams, AccountModel>()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...Builder.field("email").required().email().build(),
    ...Builder.field("password").required().min(5).build()
  ])  
  
  return (
    <LoginPage 
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}