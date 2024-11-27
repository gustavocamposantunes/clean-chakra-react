import { Input, InputProps, Field, Box, defineStyle } from "@chakra-ui/react"
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
  return (
    <Field.Root 
      data-testid={`${props.name}-wrap`} 
      data-status={error ? "invalid" : "valid"}      
    >
      <Box pos="relative" w="full">
        <Input 
          title={error} 
          data-status={error ? "invalid" : "valid"} 
          css={fieldInputStyles} 
          className="peer" 
          variant="flushed" 
          {...props} 
          data-testid={props.name} 
          onChange={handleChange} 
          placeholder="" 
        />
        <Field.Label
          data-testid={`${props.name}-label`}
          title={error} 
          css={fieldLabelStyles}
        >
            {props.placeholder}
        </Field.Label>
      </Box>
    </Field.Root>
  )
}

const fieldInputStyles = defineStyle({
  borderBottomStyle: "dashed",
  borderBottomWidth: "2px",
  _focus: {
    borderBottomStyle: "solid"
  },
  "&[data-status='invalid']": {
    borderColor: "red.500",
  },
  "&[data-status='valid']": {
    borderColor: "green.500",
  },
})

const fieldLabelStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
})