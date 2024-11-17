import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AddAccount, SaveAccessToken } from "@/domain/usecases"
import { SignUpTemplate } from "@/presentation/components/templates"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"


type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}
export const SignUpPage: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}) => {
  const navigate = useNavigate()
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
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      navigate("/")
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <Context.Provider value={{ state, setState }}>
      <SignUpTemplate onSubmit={handleSubmit} />
    </Context.Provider>
  )
}