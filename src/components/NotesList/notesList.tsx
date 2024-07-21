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
  bookId: string;
}

const NotesList = ({ bookId }: NotesListProps): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<number>(0);
  const [emptySubmittedNote, setEmptySubmittedNote] = useState<boolean>(false);
  const maxHeight = 200;

  useEffect(() => {
    getBookNotes(bookId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  useEffect(() => {
    if (newNote !== "") {
      setEmptySubmittedNote(false);
      setNewNote(newNote);
    }
  }, [newNote]);

  const getBookNotes = async (id: string) => {
    try {
      const bookId = Number(id);

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notes/${bookId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch notes for bookId: " + bookId);
      }
      const bookNotes = await response.json();

      const sortedBookNotes = sortBookNotes(bookNotes);
      setNotes(sortedBookNotes);
    } catch (error) {
      console.log("Error fetching notes for bookId: " + bookId, error);
      return [];
    }
  };

  const submitNewBookNote = async (content: String, bookId: string) => {
    const book_id = Number(bookId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notes/${book_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, book_id }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to add book to the to read list.");
      }
    } catch (error) {
      console.log("Error submitting new note: ", error);
    }
  };

  const adjustTextareaHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newHeight = Math.min(maxHeight, event.currentTarget.scrollHeight);
    setTextareaHeight(newHeight);
  };

  const handleValueChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
    adjustTextareaHeight(event);
  };

  const handleSubmitNewNote = async () => {
    if (newNote === "") {
      setEmptySubmittedNote(true);
      return;
    }

    await submitNewBookNote(newNote, bookId);
    getBookNotes(bookId);
    setTextareaHeight(0);
    setNewNote("");
  };

  // sorts the notes by date and then then by id if 2 notes have the same date
  const sortBookNotes = (bookNotes: Note[]) => {
    const sortedBookNotes = bookNotes.sort((a: Note, b: Note) => {
      const dateComp = b.date.localeCompare(a.date);
      if (dateComp !== 0) return dateComp;

      return Number(b.id) - Number(a.id);
    });

    return sortedBookNotes;
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notes/${noteId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete the note");
      }

      await response.json();
    } catch (error) {
      console.log("Error deleting note: " + noteId, error);
    }
    getBookNotes(bookId);
  };

  const getNoteDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
                <Card p={5}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mb={2}
                  >
                    <Text fontSize="sm" as="b" color={"gray.500"}>{getNoteDate(note.date)}</Text>
                    <Button
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <Text as="cite">
                      {note.content}
                    </Text>
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
