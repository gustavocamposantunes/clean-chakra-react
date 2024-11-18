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
    isFormInvalid: true,
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
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })    
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
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