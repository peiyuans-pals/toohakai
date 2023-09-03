import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

import {
  ListItem,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";
import { CheckCircleIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function QuestionBank_Table({
  QuestionBankData,
  isOpen,
  onOpen,
  onClose,
  btnRef,
  setOpenMode,
  setLoadedData,
}) {
  function handleclick(JsonData) {
    onOpen();
    setOpenMode("Edit");
    setLoadedData(JsonData);
  }

  function showMore(id) {
    var element_state = document.getElementById(id)?.style.display;
    console.log(element_state);
    if (element_state == "block") {
      document.getElementById(id)!.style.display = "none";
    } else {
      document.getElementById(id)!.style.display = "block";
    }
  }
  return (
    <>
      <Table
        marginTop="5"
        width={{ base: "100%", md: "640px", lg: "800px" }}
        variant="simple"
        size="sm"
      >
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {QuestionBankData["question_bank"].map((data, key) => {
            return (
              <>
                <Tr key={key}>
                  {/* <Td>{data.topic}</Td> */}
                  <Td
                    _hover={{ color: "blue", cursor: "pointer" }}
                    style={{ wordBreak: "break-word" }}
                    onClick={() => showMore(key)}
                  >
                    <ArrowForwardIcon/>&nbsp;&nbsp;&nbsp;&nbsp;{data.question}
                  </Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      ref={btnRef}
                      onClick={() => handleclick(data)}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
                <Tr id={key} display="none">
                  <Td colSpan={4}>
                    <OrderedList paddingLeft="25px">
                      <ListItem>
                        {data.option1}
                        {data.correct == "1" && (
                          <ListIcon
                            as={CheckCircleIcon}
                            color="green.500"
                            marginLeft={1}
                          />
                        )}
                      </ListItem>
                      <ListItem>
                        {data.option2}
                        {data.correct == "2" && (
                          <ListIcon
                            as={CheckCircleIcon}
                            color="green.500"
                            marginLeft={1}
                          />
                        )}
                      </ListItem>
                      <ListItem>
                        {data.option3}
                        {data.correct == "3" && (
                          <ListIcon
                            as={CheckCircleIcon}
                            color="green.500"
                            marginLeft={1}
                          />
                        )}
                      </ListItem>
                      <ListItem>
                        {data.option4}
                        {data.correct == "4" && (
                          <ListIcon
                            as={CheckCircleIcon}
                            color="green.500"
                            marginLeft={1}
                          />
                        )}
                      </ListItem>
                    </OrderedList>
                  </Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
