"use client";
import Sidebar from "../../Components/Sidebar";
import * as React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Select, Box, Flex, Button, Stack, Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function QuestionBank() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Sidebar />
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create New Question</DrawerHeader>

          <DrawerBody>
            <Stack>
            <FormControl isRequired>
              <FormLabel>Question</FormLabel>
              <Input type="text" />
              <FormHelperText>Eg: What is the square root of 256?</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Topic</FormLabel>
              <Input type="text" />
              <FormHelperText>Eg: Discrete Mathematics</FormHelperText>
            </FormControl>
            <FormControl isRequired marginTop={12}>
              <FormLabel>Option 1</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Option 2</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Option 3</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Option 4</FormLabel>
              <Input type="text" />
            </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
              <Button colorScheme="blue" type="submit">Create New Question</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box>
        <Flex
          flexDirection="column"
          paddingTop={100}
          paddingLeft={75}
          paddingRight={75}
        >
          <h1 className="title">Question Bank Page</h1>
          <Select placeholder="-No Filter Selected-" marginTop={5}>
            <option value="option1">Discrete Maths</option>
          </Select>
          <Button
            ref={btnRef}
            onClick={onOpen}
            marginTop={5}
            marginRight={5}
            alignSelf="flex-end"
            colorScheme="blue"
            size="sm"
          >
            New
          </Button>
          <TableContainer marginTop={5}>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Topic</Th>
                  <Th>Question</Th>
                  <Th colSpan={2}>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Discrete Maths</Td>
                  <Td>If a set B has n elements, then what is... </Td>
                  <Td>
                    <Button colorScheme="blue" size="sm">
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Discrete Maths</Td>
                  <Td>If X and y are the two finite sets, such that...</Td>

                  <Td>
                    <Button colorScheme="blue" size="sm">
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Discrete Maths</Td>
                  <Td>Find the missing number in the sequence: 5, 10...</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm">
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
