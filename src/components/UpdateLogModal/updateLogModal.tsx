import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Input,
  FormLabel,
  FormControl,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

interface UpdateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogUpdate: (value: number) => void;
  currentPage: number | undefined;
}
const UpdateLogModal: React.FC<UpdateLogModalProps> = ({ isOpen, onClose, onLogUpdate, currentPage }) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsError(false);
    if (initialRef.current && currentPage !== undefined) {
      initialRef.current.value = currentPage.toString();
    }
  }, [currentPage]);

  const handleSave = () => {
    const value = initialRef.current?.value;
    if (value && value !== '') {
      onLogUpdate(parseInt(value));
    } else {
      setIsError(true);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Reading Log</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={isError}>
            <FormLabel>Current page</FormLabel>
            <Input
              ref={initialRef}
              type="number"
              name="currentPage"
              min="0"
              placeholder="0"
              defaultValue={currentPage !== undefined ? currentPage.toString() : '0'}
            />
            {isError ? (<FormErrorMessage>Please enter a valid page number</FormErrorMessage>) : null}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateLogModal;
