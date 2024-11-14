import React from "react"

import { PublicHeader } from "../atoms"
import { AuthForm, Layout } from "../organisms"

interface ILoginTemplate {
  onSubmit?(event: React.FormEvent<HTMLDivElement>): void
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ onSubmit }) => (
  <Layout>
    <PublicHeader />
    <AuthForm onSubmit={onSubmit} />
  </Layout>
)