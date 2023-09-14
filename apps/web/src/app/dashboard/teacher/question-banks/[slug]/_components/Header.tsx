"use client";

import { Heading } from "../../../../../../components/ui";
import { trpc } from "../../../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../../../utils/trpc/lib";

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}

export const Header = ({ id, initialData }: Props) => {
  const { data: questionBank } = trpc.questionBank.get.useQuery(id, {
    initialData
  });
  return <Heading>{questionBank?.title ?? "No Title"}</Heading>;
};
