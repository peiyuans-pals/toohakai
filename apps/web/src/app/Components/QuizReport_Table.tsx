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

export default function QuizReport_Table({ quizreport_summary }) {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Topic</Th>
              <Th>Date</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              //map json file
              quizreport_summary["quiz report"].map((record) => {
                const date = new Date(record.date);
                console.log(date.getDate() + " " + (date.getMonth()+1) + date.getFullYear());
                return (
                  <Tr>
                    <Td>{record["quiz topic"]}</Td>
                    <Td>{date.getDate() + " " + convertMonth(date.getMonth()+1) + " " + date.getFullYear()}</Td>
                    <Td>
                      <Button>Expand</Button>
                    </Td>
                  </Tr>
                );
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

function convertMonth(month) {
  switch(month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
  }
}
