import { render, screen } from "@testing-library/react";
import QuestionBanks from "../../../../src/app/dashboard/teacher/question-banks/page"; //"@app/dashboard/teacher/question-banks/page";

it("it should have title test", () => {
  render(<QuestionBanks />);
  const titleElem = screen.getByText("Question Bank - Topics");
  expect(titleElem).toBeInTheDocument();
});
