import { Select, Input, Box } from "@chakra-ui/react";

export default function QuizReport_Filter({quiz_topics, parent_width})  {
    return(
        <>
            <Select 
              placeholder='Select Quiz Topic'
            >
              {
                quiz_topics["quiz topics"].map((item) => {
                    return(
                      <option value={item.topic}>{item.topic}</option>
                    );
                })
              }
            </Select>
            <Box width={50}/>
            <Input
              width={(parent.innerWidth)*(2/3)}
              type="month"
            />
        </>
    )
}