import React, { useState, useEffect } from "react"

import { LoginTemplate } from "@/presentation/components/templates/login-template"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"

type Props = {
  validation: Validation
}

export const LoginPage: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: ""
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <Context.Provider value={{ state, setState }}>
      <LoginTemplate />
    </Context.Provider>
  )
}