import SearchBox from "../searchBox";
import { render, screen } from "@testing-library/react";

// TO FIX
test('renders the SearchBox component without crashing', () => {
  render(<SearchBox />);
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

// TODO
describe('triggering a search request by pressing ENTER', () => {
  test('should display a loading spinner while the search request is being processed', () => {});

  test('should trigger a search request', () => {});

  test('should redirect the user to the search results page after the search request is triggered', () => {});
});

test('should not trigger a search request when pressing ENTER while the search box is empty', () => {});
