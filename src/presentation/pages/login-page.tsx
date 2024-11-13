import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Authentication, SaveAccessToken } from "@/domain/usecases"
import { LoginTemplate } from "@/presentation/components/templates/login-template"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols/validation"

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

export const LoginPage: React.FC<Props> = ({ 
  validation, 
  authentication, 
  saveAccessToken 
}) => {
  const navigate = useNavigate()
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
      const account = await authentication.auth({ email: state.email, password: state.password })
      console.info(account.accessToken)
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
      <LoginTemplate onSubmit={handleSubmit} />
    </Context.Provider>
  )
}