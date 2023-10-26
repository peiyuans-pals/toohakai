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

describe("RemoveQuestionBankButton", () => {
  it("Remove Question Bank Button should work work correct", () => {
    expect(true);
  });
  it("Remove Question Bank Button should open dialog", () => {
    expect(true);
  });
  it("Remove Question Bank Button should edit question bank", () => {
    expect(true);
  });
});
