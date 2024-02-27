import { GridItem, Image, Link } from "@chakra-ui/react";
import './bookListItem.scss';

export interface BookListItemProps {
  id: string,
  imageId: string,
}

const BookListItem: React.FC<BookListItemProps>  = (props): JSX.Element => {
  const {id, imageId } = props;
  const bookInfoLinkPath = `bookinfo/${id}`;
  const image = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

  return (
    <GridItem>
      <Link href={bookInfoLinkPath} className='bookListItem__container'>
        <Image src={image} fit='contain' maxH={200} h='100%' borderRadius='8px'/>
      </Link>
    </GridItem>

  );
};

export default BookListItem;