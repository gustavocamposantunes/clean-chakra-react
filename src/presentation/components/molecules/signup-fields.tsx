import { CustomInput } from "../atoms"

export const SignupFields = () => (
  <>
    <CustomInput type="text" name="name" placeholder="Digite seu nome" />
    <CustomInput type="email" name="email" placeholder="Digite seu e-mail" />
    <CustomInput type="password" name="password" placeholder="Digite sua senha" />
    <CustomInput type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
  </>
)