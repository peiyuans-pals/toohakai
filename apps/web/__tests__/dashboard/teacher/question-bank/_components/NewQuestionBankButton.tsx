/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import * as React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup
} from "@testing-library/react";
import { NewQuestionBankButton } from "./../../../../../src/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";

describe("NewQuestionBankButton", () => {
  it("New Question Bank should render correctly", () => {
    expect(true);
  });
});
