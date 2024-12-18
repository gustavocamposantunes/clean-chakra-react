import React, { useContext } from "react"

import { PublicHeader } from "../atoms"
import { FormActions } from "../molecules"
import { AuthForm, Layout } from "../organisms"

import Context from "@/presentation/contexts/form/form-context"

interface ILoginTemplate {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ onSubmit }) => {
  const { state } = useContext(Context)

  return (
    <Layout>
      <PublicHeader />
      <AuthForm 
        onSubmit={onSubmit}
        actions={(
          <FormActions 
            submitButtonText="Entrar"
            submitButtonDisabled={state.isFormInvalid}
            linkText="Criar conta"
            redirectTo="/signup"
            linkTestId="signup"
          />
        )}
      />
    </Layout>
  )
}