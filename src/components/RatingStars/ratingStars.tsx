import React, { useEffect, useState } from "react";
import { HStack, Icon, IconButton, useToast } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStars: React.FC<{ myRating: number | null, bookId: string }> = ({ myRating, bookId }) => {
  const [hoveredIndex, setHoveredIndex] = useState(myRating);
  const [currentRating, setCurrentRating] = useState(myRating);
  const toast = useToast();

  useEffect(() => {
    if (myRating) {
      setCurrentRating(myRating);
    }
  }, [myRating]);

  // Changes the color of a star and sends request to update the rating
  const handleRatingClick = (index: number) => () => {
    if (index !== currentRating) {
      setCurrentRating(index);
    }
    if (index === currentRating) {
      return;
    }
    updateMyRating(index);
  };

  const updateMyRating = async (rating: number) => {
    try {
      const response = await fetch(`http://localhost:8000/books/${bookId}/rating`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          myRating: rating,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to update rating");
      }

      toast({
        title: 'Rating updated!',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingIcon = (index: number) => {
    const emptyStar = <Icon as={FaRegStar} />;
    const fullStar = <Icon as={FaStar} color='gold'/>;

    if (hoveredIndex) {
      return index <= hoveredIndex ? fullStar : emptyStar;
    }
    if (currentRating) {
      return index <= currentRating ? fullStar : emptyStar;
    }
    return emptyStar;
  };

  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => (
        <IconButton
          key={index}
          value={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleRatingClick(index)}
          variant="unstyled"
          colorScheme="blue"
          aria-label="rating"
          icon={handleRatingIcon(index)}
        />
      ))}
    </HStack>
  );
};

export default RatingStars;
