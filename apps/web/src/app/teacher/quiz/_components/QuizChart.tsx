import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ResponsiveContainer
} from "recharts";

interface Props {
  option: string | undefined;
  correct: boolean | undefined;
  label: string;
  tally: number;
}

interface ArrayProps {
  results: Props[];
}
export const QuizChart = ({ results }: ArrayProps) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart width={1280} height={720} data={results}>
        <XAxis dataKey="option" fontSize={20} />
        <YAxis />
        <Bar dataKey="tally">
          <LabelList
            dataKey="label"
            position="top"
            fill="black"
            fontSize={40}
          />
          {results.map((entry, index) => (
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
