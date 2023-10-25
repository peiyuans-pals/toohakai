/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginButton } from "../../web/src/components/LoginButton";

describe("LoginButton", () => {
  it("should render Login Button correctly", () => {
    render(
      <LoginButton className="bg-white text-green-700 py-5 px-10 text-lg hover:bg-green-500 hover:text-white" />
    );

    const loginText = screen.getByText(/Login/i);

    expect(loginText).toBeInTheDocument();
  });
});
