import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "@radix-ui/react-icons";
import { Heading } from "src/components/ui";

interface Props {
  studentquizResult: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    selectedans: string;
    correctans: string;
  }[];
  studentscore: number;
  fullscore: number;
}

export const ResultTable = ({
  studentquizResult,
  studentscore,
  fullscore
}: Props) => {
  return (
    <div>
      {studentquizResult.map((item) => (
        <div key={studentquizResult.indexOf(item)} className="pb-2 flex-col">
          <h1>
            <b>{item.question}</b>
          </h1>
          <div className="flex gap-0.5 items-center">
            <p
              style={{
                color:
                  item.correctans === "option1" &&
                  "option1" === item.selectedans
                    ? "green"
                    : "black"
              }}
            >
              Option 1: {item.option1}
            </p>
            {item.correctans === "option1" ? (
              <CheckIcon color="green" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex gap-0.5 items-center">
            <p
              style={{
                color:
                  item.correctans === "option2" &&
                  "option2" === item.selectedans
                    ? "green"
                    : "black"
              }}
            >
              Option 2: {item.option2}
            </p>
            {item.correctans === "option2" ? (
              <CheckIcon color="green" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex gap-0.5 items-center">
            <p
              style={{
                color:
                  item.correctans === "option3" &&
                  "option3" === item.selectedans
                    ? "green"
                    : "black"
              }}
            >
              Option 3: {item.option3}
            </p>
            {item.correctans === "option3" ? (
              <CheckIcon color="green" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex gap-0.5 items-center">
            <p
              style={{
                color:
                  item.correctans === "option4" &&
                  "option4" === item.selectedans
                    ? "green"
                    : "black"
              }}
            >
              Option 4: {item.option4}
            </p>
            {item.correctans === "option4" ? (
              <CheckIcon color="green" />
            ) : (
              <></>
            )}
          </div>
          <p
            style={{
              color: item.correctans === item.selectedans ? "green" : "red"
            }}
          >
            {selectedAnsStatement(
              item.option1,
              item.option2,
              item.option3,
              item.option4,
              item.selectedans
            )}
          </p>
          <div className="pt-2">
            <Separator />
          </div>
        </div>
      ))}
    </div>
  );
};

function selectedAnsStatement(
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  selected_ans: string
) {
  switch (selected_ans) {
    case "option1":
      return "Selected: Option 1 — " + option1;
    case "option2":
      return "Selected: Option 2 — " + option2;
    case "option3":
      return "Selected Option 3 — " + option3;
    case "option4":
      return "Selected: Option 4 — " + option4;
  }
}
