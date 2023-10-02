import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
    results: Props[]
}

// * TODO
// * Change Font Size

export const QuizChart = ({results} : ArrayProps) => {
  return (
    <ResponsiveContainer>
      <BarChart width={1280} height={720} data={results}>
        <XAxis dataKey="option" />
        <YAxis />
        <Bar dataKey="tally">
        <LabelList dataKey="label" position="top" fill="black"  />
          {results.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill = {entry.correct === true ? '#16a249' : '#cbd5e1' }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
