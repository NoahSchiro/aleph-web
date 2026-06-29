import { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { searchBooks } from "../api";
import Disclaimer from "./Disclaimer";

export default function SearchTab({ liked }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setResults(await searchBooks(query.trim()));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Disclaimer />
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          label="Search books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Stack>

      {loading && <CircularProgress size={24} />}
      {error && <Alert severity="error">Something is wrong with the backend :(</Alert>}

      <List>
        {results.map((book) => {
          const alreadyLiked = liked.isLiked(book.book_id);
          return (
            <ListItem
              key={book.book_id}
              secondaryAction={
                <IconButton edge="end" disabled={alreadyLiked} onClick={() => liked.addBook(book)}>
                  {alreadyLiked ? <CheckIcon color="success" /> : <AddIcon />}
                </IconButton>
              }
            >
              <ListItemText primary={book.title} secondary={book.author} />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
