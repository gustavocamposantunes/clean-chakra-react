import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

export const CustomButton: React.FC<ButtonProps> = ({ ...props }) => (
  <Button 
    bg="purple.700" 
    _hover={{
      opacity: 0.9,
    }}
    textTransform="uppercase"
    size="xl"
    w="100%"
    {...props}
  >
    {props.children}
  </Button>
)