import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";

test("renders learn react link", () => {
  render(<Card />);
  const linkElement = screen.getByText(/views/i);
  expect(linkElement).toBeInTheDocument();
});
