import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header component", () => {
  it("should render the header with the correct text", () => {
    render(<Header />);
    const headerElement = screen.getByText(
      /Header MicrofrontEnd running port 3000/i
    );
    expect(headerElement).toBeInTheDocument();
  });
});
