'use client'

import {Box, BoxProps} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props extends BoxProps {
  children: ReactNode
}

const Page = ({children, ...props}: Props ) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      width="100vw"
      // marginY={2}
      // marginX="auto"
      paddingY={0}
      paddngX={4}
      textAlign="center"
      {...props}>
        {children}
    </Box>
  )
}

export default Page
