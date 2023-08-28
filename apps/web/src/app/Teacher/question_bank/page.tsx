"use client";
import { CounterButton } from "ui";
import Sidebar from "../../Components/Sidebar";
import * as React from "react";
import { Select, Box, Flex, Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function QuestionBank() {
  return (
    <>
      <Sidebar />
      <Box>
        <Flex
          flexDirection="column"
          paddingTop={100}
          paddingLeft={75}
          paddingRight={75}
        >
          <h1 className="title">
            Question Bank Page
          </h1>
          <Select 
          placeholder="-No Filter Selected-"
          marginTop={5}>
            <option value="option1">Discrete Maths</option>

          </Select>
          <Button 
          marginTop={5}
          marginRight={5}
          alignSelf="flex-end" 
          colorScheme="blue" 
          size="sm"
          >New</Button>
          <TableContainer
          marginTop={5}>
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
                  <Td><Button colorScheme="blue" size="sm">Edit</Button></Td>
                  <Td><Button colorScheme="red" size="sm">Delete</Button></Td>

                </Tr>
                <Tr>
                  <Td>Discrete Maths</Td>
                  <Td>If X and y are the two finite sets, such that...</Td>
                  
                  <Td><Button colorScheme="blue" size="sm">Edit</Button></Td>
                  <Td><Button colorScheme="red" size="sm">Delete</Button></Td>
                </Tr>
                <Tr>
                  <Td>Discrete Maths</Td>
                  <Td>Find the missing number in the sequence: 5, 10...</Td>
                  <Td><Button colorScheme="blue" size="sm">Edit</Button></Td>
                  <Td><Button colorScheme="red" size="sm">Delete</Button></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
