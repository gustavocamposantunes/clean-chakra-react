import { Group, Input, InputProps, InputAddon } from "@chakra-ui/react"
import React, { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const CustomInput: React.FC<InputProps> = ({ ...props }) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const getStatus = (): string => {
    return error ? "🔴" : "🟢"
  }
  const getError = (): string => error || "Tudo certo"
  return (
    <Group attached>
      <Input {...props} data-testid={props.name} onChange={handleChange} />
      <InputAddon data-testid={`${props.name}-status`} title={getError()} cursor="help">{getStatus()}</InputAddon>
    </Group>
  )
}