import RatingStars from "../ratingStars";
import { render, screen } from "@testing-library/react";

test("should render the component properly without crashing", () => {
  render(<RatingStars myRating={null} bookId={""}  />);

  expect(1).toBe(1);
});
