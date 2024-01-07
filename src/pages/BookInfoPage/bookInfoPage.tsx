
interface BookInfoPageProps {
}

// need to get the book id from the params and then fetch the specific book data
// from server?
// check how to pass data from bookListItem to another page in react router
const BookInfoPage = ({}: BookInfoPageProps): JSX.Element => {
  return (
    <>
      <h1>This is the book id: {1}</h1>
    </>
  );
};

export default BookInfoPage;