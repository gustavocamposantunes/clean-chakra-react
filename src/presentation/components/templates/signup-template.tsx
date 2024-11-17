import React, { useContext } from "react";

import { PublicHeader } from "../atoms";
import { FormActions } from "../molecules";
import { SignupForm, Layout } from "../organisms";

import Context from "@/presentation/contexts/form/form-context"

interface ILoginTemplate {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
}

export const SignUpTemplate: React.FC<ILoginTemplate> = ({
  onSubmit
}) => {
  const { state } = useContext(Context)

  return (
    <Layout>
      <PublicHeader />
      <SignupForm 
        onSubmit={onSubmit} 
        actions={(
          <FormActions 
            submitButtonText="Cadastrar"
            submitButtonDisabled={state.isFormInvalid}
            linkText="Voltar para Login"
            redirectTo="/login"
            linkTestId="login"
          />
        )}
      />
    </Layout>
  )
}