import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function QuestionTopics_Table({ QuestionBankData }) {
  function handleOpenTopicsButton(topic_id) {
    console.log(topic_id)
    
  }
  console.log(QuestionBankData.question_bank);
  return (
    <>
      <Table marginTop="5" variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Topics</Th>
            <Th textAlign="center" colSpan={2}>
              Options
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {QuestionBankData.question_bank.map((data) => {
            return (
              <>
                <Tr key={data.topic_id}>
                  <Td style={{ wordBreak: "break-word" }}>{data.topic_name}</Td>
                  <Td textAlign="right">
                    <Link href={{
                      pathname: "/Teacher/question_bank/questions",
                      query: {
                        bank_id : data.topic_id,
                        bank_name : data.topic_name,
                      }
                    }}><Button onClick={() => handleOpenTopicsButton(data.topic_id)} colorScheme="blue" size="sm">
                      View
                    </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
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
