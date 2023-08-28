"use client"

import Page from "../../components/Page";
import {Box, Divider, Flex, Text} from "@chakra-ui/react";

export default function DashboardLayout({ children }: {
  children: React.ReactNode;
}): JSX.Element {
  return <Page>
    <Flex width="100%">
      <Box minWidth={64} height="100vh">
        {/*  sidebar */}
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Box>
      <Divider orientation="vertical"  />
      {children}
    </Flex>
  </Page>;
}
