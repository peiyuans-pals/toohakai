"use client";
import { CounterButton } from "ui";
import Sidebar from "../../Components/Sidebar";
import * as React from "react";
import { Box, Button, Flex, Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dummyData from "../../MockData/quiz_report.json" assert {type: 'json'};
import QuizReport_Table from "../../Components/QuizReport_Table";

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
            marginTop={50}
          >
            <Select 
              placeholder='Select Quiz Topic' 
              width={(parent.innerWidth)*(2/3)}
            >
              <option value='option1'>Discrete Math</option>              
            </Select>
            <Box
            width={50}>

            </Box>
            <Input
              paddingLeft={50}
              placeholder="Select Month and Year"
              type="month"
            />
          </Flex>
          <QuizReport_Table quizreport_summary={dummyData}/>
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