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
  return (
    <>
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
            {QuestionBankData["question_bank"].map((data, key) => {
              return (
                <Tr key={key}>
                  <Td>{data.topic}</Td>
                  <Td>{data.question}</Td>
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
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
