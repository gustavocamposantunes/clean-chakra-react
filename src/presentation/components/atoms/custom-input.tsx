import { Group, Input, InputProps, InputAddon } from "@chakra-ui/react"
import React, { useContext } from "react"

import Context from "@/presentation/contexts/form/form-context"

export const CustomInput: React.FC<InputProps> = ({ ...props }) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]
  const getStatus = (): string => {
    return "🔴"
  }
  const getError = (): string => error
  return (
    <Group attached>
      <Input {...props} />
      <InputAddon data-testid={`${props.name}-status`} title={getError()} cursor="help">{getStatus()}</InputAddon>
    </Group>
  )
}