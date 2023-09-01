"use client";
import Sidebar from "../../Components/Sidebar";
import QuestionDetails from "../../Components/QuestionDetails";
import * as React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Select, Box, Flex, Button, Stack, Input } from "@chakra-ui/react";
import QuestionBankData from "../../MockData/question_bank.json";
import QuestionBank_Table from "../../Components/QuestionBank_Table";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openMode, setOpenMode] = React.useState();
  const [loadedData, setLoadedData] = React.useState();
  const btnRef = React.useRef();
  function handleNewQuestionButton() {
    setOpenMode("New");
    onOpen();
  }
  return (
    <>
      <Sidebar />
      <QuestionDetails
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        openMode={openMode}
        loadedData={loadedData}
      />
      <Box>
        <Flex
          flexDirection="column"
          paddingTop={100}
          paddingLeft={75}
          paddingRight={75}
        >
          <h1 className="title">Question Bank Page</h1>
          <Select placeholder="-No Filter Selected-" marginTop={5}>
            <option value="option1">Filter Function Unimplemented yet.</option>
          </Select>
          <Button
            ref={btnRef}
            onClick={handleNewQuestionButton}
            marginTop={5}
            marginRight={5}
            alignSelf="flex-end"
            colorScheme="blue"
            size="sm"
          >
            New
          </Button>
          <QuestionBank_Table
            QuestionBankData={QuestionBankData}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            btnRef={btnRef}
            setOpenMode={setOpenMode}
            setLoadedData={setLoadedData}
          />
        </Flex>
      </Box>
    </>
  );
}
