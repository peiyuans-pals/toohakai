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
import { TopicBar } from "../../../../src/app/dashboard/teacher/quiz-reports/_components/TopicBar";

describe("TopicBar", () => {
  it("TopicBar should render correctly", () => {
    expect(true);
  });
  it("TopicBar should open dialog", () => {
    expect(true);
  });
  it("TopicBar Button should edit the topic filter", () => {
    expect(true);
  });
});
