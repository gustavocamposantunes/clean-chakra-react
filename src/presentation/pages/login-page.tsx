import { useState } from "react"

import { LoginTemplate } from "@/presentation/components/templates/login-template"
import Context from "@/presentation/contexts/form/form-context"

export const LoginPage = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    main: ""
  })

  return (
    <Context.Provider value={{ state, errorState }}>
      <LoginTemplate />
    </Context.Provider>
  )
}