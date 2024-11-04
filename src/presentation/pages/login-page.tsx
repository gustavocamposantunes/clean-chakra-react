import React, { useState, useEffect } from "react"

import { Authentication } from "@/domain/usecases"
import { LoginTemplate } from "@/presentation/components/templates/login-template"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"

type Props = {
  validation: Validation
  authentication: Authentication
}

export const LoginPage: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: ""
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })    
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState({
        ...state,
        isLoading: true
      })
      await authentication.auth({ email: state.email, password: state.password })
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
      <LoginTemplate onSubmit={handleSubmit} />
    </Context.Provider>
  )
}