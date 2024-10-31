import { Group, Input, InputProps, InputAddon } from "@chakra-ui/react"
import React from "react"

export const CustomInput: React.FC<InputProps> = ({ ...props }) => (
  <Group attached>
    <Input {...props} />
    <InputAddon cursor="help">🔴</InputAddon>
  </Group>
)