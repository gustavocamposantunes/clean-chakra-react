import { CustomInput } from "../atoms"

export const AuthFields = () => (
  <>
    <CustomInput type="email" name="email" placeholder="Digite seu e-mail" />
    <CustomInput type="password" name="password" placeholder="Digite sua senha" />
  </>
)