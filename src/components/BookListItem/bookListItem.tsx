import { Box, Image } from "@chakra-ui/react";

interface BookListItemProps {
  title: string,
  author?: string,
  image?: string,
}
// const BookListItem: React.FC<BookListItemProps>  = ({ image }): JSX.Element => {

//   return (
//     <Box>
//       <Image src={image} maxH={200}/>
//     </Box>
//   );
// };

const BookListItem: React.FC<BookListItemProps>  = ({ title, image }): JSX.Element => {

  return (
    <Box>
      <p>{title}</p>
      <Image src={image} maxH={200}/>
    </Box>
  );
};

export default BookListItem;