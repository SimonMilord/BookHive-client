import { Grid, GridItem } from "@chakra-ui/react";
import BookListItem from "../BookListItem/bookListItem";
import { Book } from "src/types/book";

const imagePlaceholder =
  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg";

interface BookListProps {
  booksArray: Book[];
}
const BookList = ({ booksArray }: BookListProps): JSX.Element => {

  return (
    <Grid templateColumns="repeat(9, 1fr)" gap={3} my={6}>
      {booksArray &&
        booksArray.map((book: any) => {
          return (
            <GridItem key={book.book_id}>
              <BookListItem
                id={book.book_id}
                image={book.image || imagePlaceholder}
              />
            </GridItem>
          );
        })}
    </Grid>
  );
};

export default BookList;
