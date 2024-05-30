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
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { serverURL } from "src/App";

const statusOptions = ["To Read", "Started", "Finished"];
interface UpdateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogUpdate: (currentPage: number, status: string, startedDate: string, bookId: string, pageCount: number, readingDuration: number) => void;
  currentPage: number;
  status: string,
  startedDate: string,
  bookId: string,
  pageCount: number,
  readingDuration: number,
}
const UpdateLogModal: React.FC<UpdateLogModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  status,
  startedDate,
  bookId,
  pageCount,
  readingDuration
}) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [updatedCurrentPage, setUpdatedCurrentPage] = useState<number>(currentPage);
  const [updatedStatus, setUpdatedStatus] = useState<string>(status);
  const [updatedStartedDate, setUpdatedStartedDate] = useState<string | null>(startedDate);
  const [updatedFinishedDate, setUpdatedFinishedDate] = useState<string | null>(null);
  const [updatedReadingDuration, setUpdatedReadingDuration] = useState<number>(readingDuration);
  const toast = useToast();

  useEffect(() => {
    setUpdatedReadingDuration(getReadingDuration());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedCurrentPage, updatedStatus, updatedStartedDate, updatedFinishedDate]);

  const handleUpdateReadingLog = async () => {
    try {
      const latestStatus = getUpdatedStatus(status);
      const response = await fetch(`${serverURL}/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPage: updatedCurrentPage,
          status: latestStatus,
          startedDate: updatedStartedDate,
          finishedDate: updatedFinishedDate,
          readingDuration: updatedReadingDuration,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to update reading log");
      };

      onClose();
      toast({
        title: "Reading log successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    if (newStatus === "Finished") {
      setUpdatedFinishedDate(new Date().toString());
      setUpdatedCurrentPage(pageCount);
      setUpdatedStartedDate(startedDate);
    }

    if (newStatus === "Started") {
      setUpdatedStartedDate(new Date().toString());
    }

    if (newStatus === "To Read") {
      setUpdatedStartedDate('Not started yet');
      setUpdatedFinishedDate(null);
      setUpdatedCurrentPage(0);
    }

    setUpdatedStatus(newStatus);
    getUpdatedStatus(updatedStatus);
  };

  const handleCurrentPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value);
    switch (true) {
      case newPage < 0 || newPage > pageCount:
        setIsError(true);
        break;
      case newPage > 0 && newPage < pageCount:
        setUpdatedCurrentPage(newPage);
        setUpdatedStatus('Started');
        setIsError(false);
        break;
      case newPage === pageCount:
        setUpdatedCurrentPage(newPage);
        setUpdatedStatus('Finished');
        setUpdatedFinishedDate(new Date().toString());
        setIsError(false);
        break;
      default:
        setUpdatedCurrentPage(0);
        setUpdatedStatus('To Read');
        setIsError(false);
        break;
    }
  };

  const handleStartedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    const newDate = new Date(event.target.value).toISOString().split('T')[0];

    if (newDate > new Date().toISOString().split('T')[0]) {
      setIsError(true);
    }
    setUpdatedStartedDate(event.target.value);
    setUpdatedStatus('Started');
  };

  const getUpdatedStatus = (status: string) => {
    if (status === "To Read" && (updatedStartedDate !== null)) {
      return "Started";
    }
    return updatedStatus;
  };

  const getDefaultDateValue = () => {
    if (startedDate !== 'Not started yet') {
      return new Date(startedDate).toISOString().split('T')[0];
    };
    return;
  };

  const getReadingDuration = () => {
    const today: Date = new Date();
    const latestDate: Date = updatedFinishedDate !== null ? new Date(updatedFinishedDate) : today;
    const startedDay: Date = new Date(updatedStartedDate ?? today.toISOString());
    const timeDifference: number = latestDate.getTime() - startedDay.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    return daysDifference > 0 ? daysDifference : 0;
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
            <Stack spacing={2}>
              <FormLabel>Status</FormLabel>
              <Select variant="filled" onChange={handleChangeStatus}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
                ;
              </Select>
              <FormLabel>Started date</FormLabel>
              <Input
                size="md"
                type="date"
                defaultValue={getDefaultDateValue()}
                onChange={(e) => handleStartedDateChange(e)}
              />
              <FormLabel>Current page</FormLabel>
              <Input
                ref={initialRef}
                type="number"
                name="currentPage"
                variant="filled"
                min="0"
                max={pageCount}
                placeholder="0"
                defaultValue={
                  currentPage !== undefined ? currentPage.toString() : "0"
                }
                onChange={(e) => {
                  handleCurrentPageChange(e);
                }}
              />
              {isError ? (
                <FormErrorMessage>
                  Please enter a valid page number
                </FormErrorMessage>
              ) : null}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateReadingLog}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateLogModal;
