import React, { useEffect, useState } from "react"

import { AddAccount } from "@/domain/usecases"
import { SignUpTemplate } from "@/presentation/components/templates"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"


type Props = {
  validation: Validation
  addAccount: AddAccount
}
export const SignUpPage: React.FC<Props> = ({
  validation,
  addAccount
}) => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    passwordConfirmation: "",
    passwordConfirmationError: "",
    mainError: ""
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })    
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) return
    setState({
      ...state,
      isLoading: true
    })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <Context.Provider value={{ state, setState }}>
      <SignUpTemplate onSubmit={handleSubmit} />
    </Context.Provider>
  )
}