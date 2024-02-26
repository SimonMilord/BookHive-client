import {
  Box,
  Button,
  Card,
  FormControl,
  List,
  ListItem,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Note } from "src/types/types";
import { FaRegTrashAlt } from "react-icons/fa";

interface NotesListProps {
  bookNotes: Note[];
  bookId: string;
}

const NotesList = ({ bookNotes, bookId }: NotesListProps): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<number>(0);
  const [emptySubmittedNote, setEmptySubmittedNote] = useState<boolean>(false);
  const maxHeight = 200;

  useEffect(() => {
    const sortedNotes = getSortedNotes(bookNotes);
    setNotes(sortedNotes);
  }, []);

  useEffect(() => {
    if (newNote !== "") {
      setEmptySubmittedNote(false);
      setNewNote(newNote);
    }
  }, [newNote]);

  const getTodayFormatted = () => {
    let today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const adjustTextareaHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newHeight = Math.min(maxHeight, event.currentTarget.scrollHeight);
    setTextareaHeight(newHeight);
  };

  const handleValueChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
    adjustTextareaHeight(event);
  };

  const getNewNoteId = () => {
    const numberOfNotes = notes.length;
    return (numberOfNotes + 1).toString();
  };

  const handleSubmitNewNote = () => {
    if (newNote === "") {
      setEmptySubmittedNote(true);
      return;
    }
    const todayDate = getTodayFormatted();
    const newNoteId = getNewNoteId();
    const newSortedNotes = getSortedNotes([
      ...notes,
      { id: newNoteId, content: newNote, date: todayDate, book_id: bookId},
    ]);
    setNotes(newSortedNotes);
    setTextareaHeight(0);
    setNewNote("");
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    // will have to delete them by calling the server delete note route
    setNotes(updatedNotes);
  };

  const getSortedNotes = (notes: Note[]) => {
    return [...notes].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  return (
    <Box>
      <Box>
        <FormControl display="flex" flexDirection="row" gap={3}>
          <Textarea
            placeholder="Enter a note here..."
            value={newNote}
            onChange={handleValueChange}
            resize="none"
            height={textareaHeight}
            overflowY="hidden"
            isInvalid={emptySubmittedNote}
          />
          <Button colorScheme="blue" onClick={handleSubmitNewNote}>
            Submit
          </Button>
        </FormControl>
        {emptySubmittedNote ? (
          <Text color="red.500">Please enter a note before submitting.</Text>
        ) : null}
      </Box>
      <Box>
        <List spacing={3} className="notesList" my={4}>
          {notes &&
            notes.map((note: Note) => (
              <ListItem key={note.id} className="notesList__item">
                <Card
                  p={5}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Text as="cite" maxWidth="80%">
                    {note.content}
                  </Text>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    maxWidth="20%"
                  >
                    <Text>{note.date}</Text>
                    <Button
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </Box>
                </Card>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default NotesList;
