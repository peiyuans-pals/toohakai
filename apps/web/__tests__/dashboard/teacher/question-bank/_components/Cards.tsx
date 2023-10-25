/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { QuestionBankCards } from "./../../../../../src/app/dashboard/teacher/question-banks/_components/QuestionBankCards";

describe("Question", () => {
  it("should render New Question Bank Button correctly", () => {
    render(<NewQuestionBankButton />);

    const newQuestionBankButtonText = screen.getByText(
      /Create New Question Bank/i
    );

    expect(newQuestionBankButtonText).toBeInTheDocument();
  });
});
