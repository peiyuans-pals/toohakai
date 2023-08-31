import { Table,Thead,Tbody,Tr,Th,Td,TableContainer, Button, } from "@chakra-ui/react"


export default function QuizReport_Table({quizreport_summary}) {
    return(
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
                  //TODO: Fix mapping issue
                  quizreport_summary["quiz report"].map((record) => 
                  {
                    <Tr>
                    <Td>{record["quiz topic"]}</Td>
                    <Td>{record.date}</Td>
                    <Td><Button>Expand</Button></Td>
                    </Tr>
                  })
                }
              </Tbody>
            </Table>
          </TableContainer>
        </>
    )
}