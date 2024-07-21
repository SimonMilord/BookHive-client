import { GridItem, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import './bookListItem.scss';

export interface BookListItemProps {
  id: string,
  imageId: string,
}

const BookListItem: React.FC<BookListItemProps>  = (props): JSX.Element => {
  const {id, imageId } = props;
  const bookInfoLinkPath = `/bookinfo/${id}`;
  const image = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

  return (
    <GridItem>
      <ChakraLink as={ReactRouterLink} to={bookInfoLinkPath} className='bookListItem__container'>
        <Image src={image} fit='contain' maxH={200} h='100%' borderRadius='8px' loading='lazy'/>
      </ChakraLink>
    </GridItem>

  );
};

export default BookListItem;