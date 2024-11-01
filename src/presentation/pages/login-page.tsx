import { useState } from "react"

import { LoginTemplate } from "@/presentation/components/templates/login-template"
import Context from "@/presentation/contexts/form/form-context"

type State = {
  isLoading: boolean
  errorMessage: string
}

export const LoginPage = () => {
  const [state] = useState<State>({
    isLoading: false,
    errorMessage: ""
  })

  return (
    <Context.Provider value={state}>
      <LoginTemplate />
    </Context.Provider>
  )
}