import { Grid } from "@chakra-ui/react";
import BookListItem from "../BookListItem/bookListItem";
import { Book } from "src/types/types";

interface BookListProps {
  booksArray: Book[];
}
const BookList = ({ booksArray }: BookListProps): JSX.Element => {

  return (
    <Grid templateColumns="repeat(9, 1fr)" gap={3} my={6}>
      {booksArray &&
        booksArray.map((book: any) => {
          return (
            <BookListItem
              key={book.id}
              id={book.id}
              imageId={book.coverId}
            />
          );
        })}
    </Grid>
  );
};

export default BookList;
