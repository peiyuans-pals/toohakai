/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import * as React from "react";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { NewQuestionBankButton } from "./../../../../../src/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";
import { SessionContextProvider }

describe("NewQuestionBankButton", () => {
	afterEach(()=>{
		cleanup();
	})
  it("renders the button and opens the dialog on click", async () => {
    render(<NewQuestionBankButton />);

    // Check if the button is rendered
    const button = screen.getByText("Create New Question Bank");
    expect(button).toBeInTheDocument();
  });
});
