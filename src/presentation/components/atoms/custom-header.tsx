import { Flex, Heading } from "@chakra-ui/react";

import { Logo } from ".";

export const CustomHeader = () => (
  <Flex 
    borderTopColor="gray.800"
    borderTopWidth="40px"
    as="header" 
    p="4" 
    bg="gray.700" 
    w="100vw" 
    direction="column" 
    justify="center" 
    align="center"
  >
    <Logo />
    <Heading as="h1" color="white" textAlign="center">4Devs - Enquetes para programadores</Heading>
  </Flex>
)