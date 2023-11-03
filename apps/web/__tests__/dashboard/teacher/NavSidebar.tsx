/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavSidebar, SidebarItem } from "@/app/dashboard/teacher/NavSidebar";
import { usePathname } from "next/navigation";

const mockItem = [
  {
    name: "Home",
    href: "/dashboard/teacher"
  },
  {
    name: "Question Banks",
    href: "/dashboard/teacher/question-banks"
  },
  {
    name: "Quiz Reports",
    href: "/dashboard/teacher/quiz-reports"
  }
];

jest.mock("next/navigation", () => {
  return {
    usePathname: () => "/dashboard/teacher"
  };
});
describe("NavSidebar", () => {
  it("should render Home Item in NavSidebar correctly", () => {
    render(<NavSidebar />);
    const homeText = screen.getByText(/Home/i);
    expect(homeText).toBeInTheDocument();
  });
  it("should render Question Banks Item in NavSidebar correctly", () => {
    render(<NavSidebar />);
    const homeText = screen.getByText(/Question Banks/i);
    expect(homeText).toBeInTheDocument();
  });
  it("should render Quiz Reports Item in NavSidebar correctly", () => {
    render(<NavSidebar />);
    const homeText = screen.getByText(/Quiz Reports/i);
    expect(homeText).toBeInTheDocument();
  });
});