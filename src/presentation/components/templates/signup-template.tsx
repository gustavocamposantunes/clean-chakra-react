import { useContext } from "react";

import { PublicHeader } from "../atoms";
import { FormActions } from "../molecules";
import { SignupForm, Layout } from "../organisms";

import Context from "@/presentation/contexts/form/form-context"

export const SignUpTemplate = () => {
  const { state } = useContext(Context)

  return (
    <Layout>
      <PublicHeader />
      <SignupForm 
        onSubmit={() => {}} 
        actions={(
          <FormActions 
            submitButtonText="Entrar"
            submitButtonDisabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError}
            linkText="Voltar para Login"
            redirectTo="/login"
          />
        )}
      />
    </Layout>
  )
}