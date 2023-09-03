"use client";
import Sidebar from "../../../components/Sidebar";
import * as React from "react";
import { Heading, Box, Flex, Button, } from "@chakra-ui/react";
import QuestionBankData from "../../MockData/question_bank.json";
import QuestionTopics_Table from "../../../components/QuestionTopics_Table";

export default function Page() {
  const btnRef = React.useRef();
  function handleNewTopicsButton() {
  }
  return (
    <>
      <Sidebar />
      <Box>
        <Flex justifyContent="center">
          <Flex
            maxWidth="95vw"
            width={{ base: "100%", md: "640px", lg: "800px" }}
            flexDirection="column"
            paddingTop={100}
            paddingRight="25px"
            paddingLeft="25px"
          >
            <Heading as="h1" size="2xl">Topics List</Heading>
            <Button
              ref={btnRef}
              onClick={handleNewTopicsButton}
              marginTop={10}
              marginRight={5}
              alignSelf="flex-end"
              colorScheme="blue"
              size="sm"
            >
              Add New Topic
            </Button>
            <QuestionTopics_Table
              QuestionBankData={QuestionBankData}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
