'use client' // for chakra ui with next-js /app

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import {TrpcProvider} from "../utils/trpc";
import {theme} from "../utils/theme";

export function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <TrpcProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </TrpcProvider>
  )
}
