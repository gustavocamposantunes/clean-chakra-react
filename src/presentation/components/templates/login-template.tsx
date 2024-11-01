import React from "react"

import { LoginHeader } from "../atoms"
import { AuthForm, Layout } from "../organisms"

export const LoginTemplate: React.FC = () => (
  <Layout>
    <LoginHeader />
    <AuthForm />
  </Layout>
)