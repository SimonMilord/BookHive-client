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
        `http://localhost:8000/books/notes/${bookId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Unable to fetch notes for bookId: " + bookId);
      }
      const bookNotes = await response.json();
      setNotes(bookNotes);
    } catch (error) {
      console.log("Error fetching notes for bookId: " + bookId, error);
      return [];
    }
  };

  const submitNewBookNote = async (date: String, content: String, bookId: string) => {
    const book_id = Number(bookId);
    console.log("book_id: ", book_id);
    console.log("date: ", date);
    console.log("content: ", content);
    try {
      const response = await fetch(`http://localhost:8000/books/notes/${book_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, content, book_id }),
      });

      if (!response.ok) {
        throw new Error("Unable to add book to the to read list.");
      };

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

    await submitNewBookNote(new Date().toString(), newNote, bookId);
    getBookNotes(bookId);
    setTextareaHeight(0);
    setNewNote("");
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/books/notes/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to delete the note");
      };

      await response.json();
      // const newNotes = notes.filter((note) => note.id !== noteId);
    } catch (error) {
      console.log('Error deleting note: ' + noteId, error);
    }
    getBookNotes(bookId);
  };

  const getNoteDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
                    <Text>{getNoteDate(note.date)}</Text>
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
