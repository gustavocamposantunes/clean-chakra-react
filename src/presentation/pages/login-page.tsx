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

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
  }

  return (
    <Context.Provider value={{ state, setState }}>
      <LoginTemplate onSubmit={handleSubmit} />
    </Context.Provider>
  )
}