import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ResponsiveContainer
} from "recharts";

interface ResultItem {
  id: number;
  text: string | undefined;
  isCorrect: boolean | undefined;
  percentage: string;
  tally: number;
}

interface Props {
  results: ResultItem[];
}
export const QuizChart = ({ results }: Props) => {
  const formattedData = results.map((result) => {
    if (result.percentage == "NaN%") {
      console.log("Is NaN");
      return {
        option: result.text,
        correct: result.isCorrect,
        label: `0%`,
        tally: result.tally
      };
    }
    return {
      option: result.text,
      correct: result.isCorrect,
      label: `${result.percentage}%`,
      tally: result.tally
    };
  });

  //console.log("formattedData for QuizChart", formattedData);

  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart width={1280} height={720} data={formattedData}>
        <XAxis dataKey="option" fontSize={20} />
        <YAxis />:
        <Bar dataKey="tally">
          <LabelList
            dataKey="label"
            position="top"
            fill="black"
            fontSize={40}
          />
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.correct === true ? "#16a249" : "#cbd5e1"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
