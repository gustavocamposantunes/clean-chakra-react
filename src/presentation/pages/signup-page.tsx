import React, { useEffect, useState } from "react"

import { SignUpTemplate } from "@/presentation/components/templates"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"


type Props = {
  validation: Validation
}
export const SignUpPage: React.FC<Props> = ({
  validation
}) => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    passwordError: "Campo obrigatório",
    passwordConfirmationError: "Campo obrigatório",
    mainError: ""
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })    
  }, [state.name])

  return (
    <Context.Provider value={{ state, setState }}>
      <SignUpTemplate />
    </Context.Provider>
  )
}