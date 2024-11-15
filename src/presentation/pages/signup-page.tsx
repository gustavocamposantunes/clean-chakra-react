import React from "react"

import { SignUpTemplate } from "@/presentation/components/templates"
import Context from "@/presentation/contexts/form/form-context"


export const SignUpPage: React.FC = () => (
  <Context.Provider value={{ state: {} }}>
    <SignUpTemplate />
  </Context.Provider>
)