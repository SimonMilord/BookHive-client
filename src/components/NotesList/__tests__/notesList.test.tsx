import NotesList from "../notesList";
import { render, screen } from "@testing-library/react";

test("should render the component properly without crashing", () => {
  render(<NotesList bookId={"1"} />);

  expect(screen.getByRole("textarea")).toBeInTheDocument();
});
