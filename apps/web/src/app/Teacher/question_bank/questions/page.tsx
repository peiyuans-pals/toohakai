"use client";
import Sidebar from "../../../../components/Sidebar";
import QuestionDetails from "../../../../components/QuestionDetails";
import * as React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Heading, Box, Flex, Button, Spacer } from "@chakra-ui/react";
import QuestionBankData from "../../../MockData/question_bank.json";
import QuestionBank_Table from "../../../../components/QuestionBank_Table";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: {
    bank_id: string;
    bank_name: string;
  };
}) {
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
        <Flex justifyContent="center">
          <Flex
            maxWidth="95vw"
            width={{ base: "100%", md: "640px", lg: "800px" }}
            flexDirection="column"
            paddingTop={100}
            paddingRight="25px"
            paddingLeft="25px"
          >
            <Heading as="h1" size="2xl">
              Question Bank for {searchParams.bank_name}
            </Heading>
            {/* <Select placeholder="-No Filter Selected-" marginTop={5}>
            <option value="option1">Filter Function Unimplemented yet.</option>
          </Select> */}
            <Flex>
              <Link href="/Teacher/question_bank">
                <Button marginTop="10" colorScheme="blue" size="sm">
                  Return back to Topics List
                </Button>
              </Link>
              <Spacer />
              <Button
                marginTop="10"
                ref={btnRef}
                onClick={handleNewQuestionButton}
                colorScheme="blue"
                size="sm"
              >
                Add New Question
              </Button>
            </Flex>

            <QuestionBank_Table
              QuestionBankData={QuestionBankData}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              btnRef={btnRef}
              setOpenMode={setOpenMode}
              setLoadedData={setLoadedData}
              bank_id={searchParams.bank_id}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
