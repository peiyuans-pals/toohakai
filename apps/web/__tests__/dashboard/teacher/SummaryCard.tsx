/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { SummaryCard } from "@/app/dashboard/teacher/SummaryCard";

describe("SummaryCard", () => {
  it("should render Summary Card correctly", () => {
    render(<SummaryCard title="hello" currentValue="5" changeInValue="25%" />);

    const changeInValueText = screen.getByText(/from last month/i);

    expect(changeInValueText).toBeInTheDocument();
  });
});
