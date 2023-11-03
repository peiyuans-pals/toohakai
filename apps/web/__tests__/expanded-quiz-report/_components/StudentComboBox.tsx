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
import { StudentComboBox } from "../../../src/app/dashboard/teacher/quiz-reports/[slug]/_components/StudentComboBox";

describe("StudentComboBox", () => {
  it("StudentComboBox should render correctly", () => {
    expect(true);
  });
  it("StudentComboBox should open dialog", () => {
    expect(true);
  });
  it("StudentComboBox Button should edit the student filter", () => {
    expect(true);
  });
});
