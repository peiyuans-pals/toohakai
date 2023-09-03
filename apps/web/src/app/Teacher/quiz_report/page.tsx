"use client";
;
import Sidebar from "../../../components/Sidebar";
import * as React from "react";
import { Box, Button, Flex, Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dummyTableData from "../../../MockData/quiz_report.json" assert {type: 'json'};
import dummyTopicData from "../../../MockData/quiz_topics.json" assert {type: 'json'};
import QuizReport_Table from "../../../components/QuizReport_Table";
import QuizReport_Filter from "../../../components/QuizReport_Filters";

export default function Page() {

  return (
    <>
      <Sidebar/>
      <Box>
        <Flex
          flexDirection = "column"
          paddingTop={100}
          paddingLeft={75}
          paddingRight={75}
        >
          <h1 className="title">Quiz Report Page</h1>
          <Flex
            className="selection column"
            flexDirection="row"
          >
            <QuizReport_Filter quiz_topics={dummyTopicData}/>
          </Flex>
          <QuizReport_Table quizreport_summary={dummyTableData}/>
        </Flex>
      </Box>
    </>
  );
  }

/**
 * <h1 className="title">
        Quiz Report Page <br />
        <span>Content here</span>
      </h1>
 * **/
