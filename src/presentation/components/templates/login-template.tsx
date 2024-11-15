import React from "react"

import { PublicHeader } from "../atoms"
import { FormActions } from "../molecules"
import { AuthForm, Layout } from "../organisms"

interface ILoginTemplate {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ onSubmit }) => (
  <Layout>
    <PublicHeader />
    <AuthForm 
      onSubmit={onSubmit}
      actions={(
        <FormActions 
          buttonText="Entrar"
          linkText="Criar conta"
          redirectTo="/signup"
        />
      )}
    />
  </Layout>
)