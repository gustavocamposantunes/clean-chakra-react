import React from "react"

import { LoginHeader } from "../atoms"
import { AuthForm, Layout } from "../organisms"

interface ILoginTemplate {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ onSubmit }) => (
  <Layout>
    <LoginHeader />
    <AuthForm onSubmit={onSubmit} />
  </Layout>
)