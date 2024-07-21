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
import React, {useRef, useState } from "react";

const statusOptions = ["To Read", "Started", "Finished"];
interface UpdateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogUpdate: (currentPage: number, status: string, startedDate: string, finishedDate: string, bookId: string, pageCount: number, readingDuration: number) => void;
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
  onLogUpdate,
  currentPage,
  status,
  startedDate,
  bookId,
  pageCount,
  readingDuration
}) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);
  const [isStartedDateError, setIsStartedDateError] = useState<boolean>(false);
  const [isPagesError, setIsPagesError] = useState<boolean>(false);
  const [updatedCurrentPage, setUpdatedCurrentPage] = useState<number>(currentPage);
  const [updatedStatus, setUpdatedStatus] = useState<string>(status);
  const [updatedStartedDate, setUpdatedStartedDate] = useState<string>(startedDate);
  const [updatedFinishedDate, setUpdatedFinishedDate] = useState<string>('');
  const [updatedReadingDuration, setUpdatedReadingDuration] = useState<number>(readingDuration);
  const toast = useToast();

  const handleUpdateReadingLog = async () => {
    if (isPagesError || isStartedDateError) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPage: updatedCurrentPage,
          status: updatedStatus,
          startedDate: updatedStartedDate,
          finishedDate: updatedFinishedDate,
          readingDuration: updatedReadingDuration,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to update reading log");
      };

      onLogUpdate(updatedCurrentPage, updatedStatus, updatedStartedDate, updatedFinishedDate, bookId, pageCount, updatedReadingDuration);
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

  const handleCloseModal = () => {
    setIsPagesError(false);
    setIsStartedDateError(false);
    onClose();
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    if (newStatus === "Finished") {
      setUpdatedFinishedDate(new Date().toString());
      setUpdatedCurrentPage(pageCount);
      setUpdatedStartedDate(startedDate);
      setReadingDuration(new Date(updatedStartedDate));
    }

    if (newStatus === "Started") {
      setUpdatedStartedDate(new Date().toString());
      setReadingDuration(new Date(updatedStartedDate));
    }

    if (newStatus === "To Read") {
      setUpdatedStartedDate('Not started yet');
      setUpdatedFinishedDate('');
      setUpdatedCurrentPage(0);
      setReadingDuration(new Date());
    }
    setUpdatedStatus(newStatus);
  };

  const handleCurrentPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value);
    switch (true) {
      case newPage < 0 || newPage > pageCount:
        setIsPagesError(true);
        break;
      case newPage > 0 && newPage < pageCount:
        setUpdatedCurrentPage(newPage);
        if (updatedStartedDate === 'Not started yet') {
          setUpdatedStatus('Started');
          setUpdatedStartedDate(new Date().toString());
        }
        setReadingDuration(new Date(updatedStartedDate));
        setIsPagesError(false);
        break;
      case newPage === pageCount:
        setUpdatedCurrentPage(newPage);
        setUpdatedStatus('Finished');
        setUpdatedFinishedDate(new Date().toString());
        setReadingDuration(new Date(updatedStartedDate));
        setIsPagesError(false);
        break;
      default:
        setUpdatedCurrentPage(0);
        setIsPagesError(false);
        setReadingDuration(new Date());
        break;
    }
  };

  const handleStartedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStartedDateError(false);
    const newDate = new Date(event.target.value).toISOString().split('T')[0];

    if (newDate > new Date().toISOString().split('T')[0]) {
      setIsStartedDateError(true);
    } else {
      setIsStartedDateError(false);
      setUpdatedStartedDate(newDate);
      setUpdatedStatus('Started');
    }
    setReadingDuration(new Date(newDate));
  };

  const getDefaultStartedDateValue = () => {
    if (startedDate !== 'Not started yet') {
      return new Date(startedDate).toISOString().split('T')[0];
    };
    return;
  };

  const setReadingDuration = (startedDateToUse: Date) => {
    const today: Date = new Date();
    const latestDate: Date = updatedFinishedDate !== '' ? new Date(updatedFinishedDate) : today;
    const startedDay: Date = startedDateToUse;
    const timeDifference: number = latestDate.getTime() - startedDay.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    const newDuration = daysDifference > 0 ? daysDifference : 0;
    setUpdatedReadingDuration(newDuration);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Reading Log</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={isPagesError || isStartedDateError}>
            <Stack spacing={2}>
              <FormLabel>Status</FormLabel>
              <Select variant="filled" onChange={handleChangeStatus} placeholder={status}>
                {statusOptions.filter((statusOption) => statusOption !== status).map((status) => (
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
                defaultValue={getDefaultStartedDateValue()}
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
              {isPagesError ? (
                <FormErrorMessage>
                  Please enter a valid page number between 0 and {pageCount}
                </FormErrorMessage>
              ) : null}
              {isStartedDateError ? (
                <FormErrorMessage>
                  You cannot set a future date as the started date
                </FormErrorMessage>
              ) : null}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateReadingLog}>
            Save
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateLogModal;
