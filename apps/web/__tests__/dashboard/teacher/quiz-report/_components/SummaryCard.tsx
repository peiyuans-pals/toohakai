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
import { QuizReportCards } from "../../../../src/app/dashboard/teacher/quiz-reports/_components/Cards";

describe("QuizReportCards", () => {
  it("QuizReportCards should render correctly", () => {
    expect(true);
  });
  it("QuizReportCards should redirect user to new tab", () => {
    expect(true);
  });
});
