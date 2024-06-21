import SearchResultListItem from "../searchResultListItem";
import { render, screen } from "@testing-library/react";

test("should render the component properly without crashing", () => {
  render(<SearchResultListItem result={{
    id: "",
    title: "",
    author_name: [],
    cover_i: "",
    isbn: [],
    number_of_pages_median: 0,
    language: [],
    subject: [],
    publisher: [],
    first_publish_year: 0,
    first_sentence: "",
    ratings_average: 0,
    ratings_count: 0,
    id_amazon: []
  }}  />);

  expect(1).toBe(1);
});
