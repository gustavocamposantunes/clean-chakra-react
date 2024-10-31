import { LoginHeader } from "../atoms"
import { AuthForm, Layout } from "../organisms"

export const LoginTemplate = () => (
  <Layout>
    <LoginHeader />
    <AuthForm />
  </Layout>
)