/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { NewQuestionBankButton } from "@/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";

describe("NewQuestionBankButton", () => {
  it("should render New Question Bank Button correctly", () => {
    render(<NewQuestionBankButton />);

    const newQuestionBankButtonText = screen.getByText(
      /Create New Question Bank/i
    );

    expect(newQuestionBankButtonText).toBeInTheDocument();
  });
});
