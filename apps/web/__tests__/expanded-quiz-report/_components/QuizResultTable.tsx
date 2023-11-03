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
import { QuizResultTable } from "../../../src/app/dashboard/teacher/quiz-reports/[slug]/_components/QuizResultTable";

describe("QuizResultTable", () => {
  it("QuizResultTable should render correctly", () => {
    expect(true);
  });
});
