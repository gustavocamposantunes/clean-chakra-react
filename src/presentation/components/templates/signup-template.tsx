import { PublicHeader } from "../atoms";
import { FormActions } from "../molecules";
import { SignupForm, Layout } from "../organisms";

export const SignUpTemplate = () => (
  <Layout>
    <PublicHeader />
    <SignupForm 
      onSubmit={() => {}} 
      actions={(
        <FormActions 
          buttonText="Entrar"
          linkText="Voltar para Login"
          redirectTo="/login"
        />
      )}
    />
  </Layout>
)