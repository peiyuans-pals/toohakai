/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { NewQuestionBankButton } from "./../../../../../src/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";
//import { NewQuestionBankButton } from "@/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";

describe("NewQuestionBankButton", () => {
  it("should render New Question Bank Button correctly", () => {
    render(<NewQuestionBankButton />);

    const newQuestionBankButtonText = screen.getByText(
      /Create New Question Bank/i
    );

    expect(newQuestionBankButtonText).toBeInTheDocument();
  });
});
