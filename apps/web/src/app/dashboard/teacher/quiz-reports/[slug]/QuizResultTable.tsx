import { CheckIcon } from "@radix-ui/react-icons";
import { DashboardView, Heading } from "src/components/ui"

interface Props {
    studentquizResult: { question: string; option1: string; option2: string; option3: string; option4: string; selectedans: string; correctans: string; }[],
    studentname: string,
    studentscore: number,
    fullscore: number
}

export const QuizResultTable = ({studentquizResult, studentname, studentscore, fullscore}: Props) => {
    console.log(studentquizResult);

    return (
        <div>
            <div className="flex flex-wrap flex-row justify-between">
                <Heading>{studentname}</Heading>
                <Heading>Total Score: {studentscore}/{fullscore}</Heading>
            </div>
            {studentquizResult.map((item) => (
                <div className="pb-4">
                    <h1>{item.question}</h1>
                    <div>
                        <p style={{color: (item.correctans===item.option1 && item.option1===item.selectedans) ? "green" : "black" }}>Option 1: {item.option1}</p>
                        {item.correctans===item.option1 ? <CheckIcon/> : <></>}
                    </div>
                    <div className="flex-row">
                        <p style={{color: (item.correctans===item.option2 && item.option2===item.selectedans) ? "green" : "black" }}>Option 2: {item.option2}</p>
                        {item.correctans===item.option2 ? <CheckIcon/> : <></>}
                        <CheckIcon color="green"/>
                    </div>
                    <div>
                        <p style={{color: (item.correctans===item.option3 && item.option3===item.selectedans) ? "green" : "black" }}>Option 3: {item.option3}</p>
                        {item.correctans===item.option3 ? <CheckIcon/> : <></>}
                    </div>
                    <div>
                        <p style={{color: (item.correctans===item.option4 && item.option4===item.selectedans) ? "green" : "black" }}>Option 4: {item.option4}</p>
                        {item.correctans===item.option4 ? <CheckIcon/> : <></>}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

function selectedAnsStatement(option1:string, option2:string, option3:string, option4:string, selected_ans:string){
    switch(selected_ans){
        case option1:
            return "Selected Option: Option 1"
        case option2:
            return "Selected Option: Option 2"
        case option3:
            return "Selected Option: Option 3"
        case option4:
            return "Selected Option: Option 4"
    }
}