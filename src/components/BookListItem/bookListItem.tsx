import { Image, Link } from "@chakra-ui/react";
import './bookListItem.scss';

export interface BookListItemProps {
  id: string,
  image?: string,
}

const BookListItem: React.FC<BookListItemProps>  = (props): JSX.Element => {
  const {id, image } = props;
  const bookInfoLinkPath = `bookinfo/${id}`;

  return (
    <>
      <Link href={bookInfoLinkPath} className='bookListItem__container'>
        <Image src={image} fit='contain' maxH={200} h='100%' borderRadius='8px'/>
      </Link>
    </>

  );
};

export default BookListItem;