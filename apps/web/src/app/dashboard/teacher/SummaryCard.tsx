import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export interface SummaryCardProps {
  title: string;
  currentValue: string;
  changeInValue?: string;
  subtitle?: string;
}

export const SummaryCard = ({
  href,
  ...props
}: SummaryCardProps & { href?: string }) => {
  if (href) {
    return (
      <Link href={href}>
        <SummaryCardContent {...props} />
      </Link>
    );
  }
  return <SummaryCardContent {...props} />;
};

const SummaryCardContent = ({
  title,
  currentValue,
  changeInValue,
  subtitle
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        {changeInValue ? (
          <>
            <div className="text-2xl font-bold">{currentValue}</div>
            <p className="text-xs text-muted-foreground">
              {changeInValue} from last month
            </p>
          </>
        ) : (
          <CardTitle className="text-2xl font-bold">{subtitle}</CardTitle>
        )}
      </CardContent>
    </Card>
  );
};
