"use client";

import { trpc } from "../../../../utils/trpc/client";
import Link from "next/link";

interface Props {
  initialData: any[];
}

export const QuestionBankDataTable = ({ initialData }: Props) => {
  const { data: questionBanksData } = trpc.questionBank.list.useQuery(
    undefined,
    {
      initialData
    }
  );

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionBanksData.map((questionBank) => (
            <tr key={questionBank.id}>
              <td className="border px-4 py-2">{questionBank.id}</td>
              <td className="border px-4 py-2">{questionBank.name}</td>
              <td className="border px-4 py-2 flex flex-row gap-1">
                <Link
                  href={`/dashboard/teacher/question-banks/${questionBank.id}`}
                >
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
