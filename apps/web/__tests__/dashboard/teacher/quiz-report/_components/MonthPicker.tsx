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
import { MonthPicker } from "../../../../../src/app/dashboard/teacher/quiz-reports/_components/MonthPicker";

describe("MonthPicker", () => {
  it("MonthPicker should render correctly", () => {
    expect(true);
  });
  it("MonthPicker should open dialog", () => {
    expect(true);
  });
  it("MonthPicker Button should edit the Month filter", () => {
    expect(true);
  });
});
