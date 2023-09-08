import { DashboardView, Heading } from "../../../../../components/ui";

export default function Quiz({ params }: { params: { slug: string } }) {
  return (
    <DashboardView>
      <Heading>Quiz {params.slug}</Heading>
    </DashboardView>
  );
}
