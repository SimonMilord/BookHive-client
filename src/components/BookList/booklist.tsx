import { Grid, GridItem } from "@chakra-ui/react";
import BookListItem from "../BookListItem/bookListItem";

const imagePlaceholder =
  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg";

interface BookListProps {
  bookArray: any[];
}
const BookList = ({ bookArray }: BookListProps): JSX.Element => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={7}>
      {bookArray &&
        bookArray.map((book: any) => {
          return (
            <GridItem key={book.id}>
              <BookListItem
                title={book.title}
                author={book.author}
                image={book.image || imagePlaceholder}
              />
            </GridItem>
          );
        })}
    </Grid>
  );
};

export default BookList;
