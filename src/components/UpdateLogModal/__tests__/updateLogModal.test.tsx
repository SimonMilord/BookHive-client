import UpdateLogModal from "../updateLogModal";
import { render, screen } from "@testing-library/react";

test("should render the component properly without crashing", () => {
  render(<UpdateLogModal bookId={"1"} isOpen={false} onClose={function (): void {
    throw new Error("Function not implemented.");
  } } onLogUpdate={function (currentPage: number, status: string, startedDate: string, finishedDate: string, bookId: string, pageCount: number, readingDuration: number): void {
    throw new Error("Function not implemented.");
  } } currentPage={0} status={""} startedDate={""} pageCount={0} readingDuration={0} />);

  expect(screen.getByRole("textarea")).toBeInTheDocument();
});
