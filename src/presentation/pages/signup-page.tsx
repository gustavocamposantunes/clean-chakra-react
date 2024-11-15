import React, { useState } from "react"

import { SignUpTemplate } from "@/presentation/components/templates"
import Context from "@/presentation/contexts/form/form-context"


export const SignUpPage: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: "Campo obrigatório",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    passwordConfirmationError: "Campo obrigatório",
    mainError: ""
  })

  return (
    <Context.Provider value={{ state }}>
      <SignUpTemplate />
    </Context.Provider>
  )
}