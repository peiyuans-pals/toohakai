/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { SummaryCard } from "@/app/dashboard/teacher/SummaryCard";

describe("SummaryCard", () => {
  it("should render Title of Summary Card correctly", () => {
    render(<SummaryCard title="Quiz Banks" currentValue="6" changeInValue="25%" />);
    const titleText = screen.getByText(/Quiz Banks/i);
    expect(titleText).toBeInTheDocument();
  });
  it("should render Value of Summary Card correctly", () => {
    render(<SummaryCard title="Quiz Banks" currentValue="6" changeInValue="25%" />);
    const valueText= screen.getByText(/6/i);
    expect(valueText).toBeInTheDocument();
  });
  it("should render Change Value Text of Summary Card correctly", () => {
    render(<SummaryCard title="Quiz Banks" currentValue="6" changeInValue="25%" />);
    const changeInValueText = screen.getByText(/from last month/i);
    expect(changeInValueText).toBeInTheDocument();
  });
});
