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
    isFormInvalid: true,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })    
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({ email: state.email, password: state.password })
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