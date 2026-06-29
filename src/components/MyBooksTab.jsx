import { List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MyBooksTab({ liked }) {
  if (liked.likedBooks.length === 0) {
    return <Typography color="text.secondary">No books added yet. Search and add some.</Typography>;
  }

  return (
    <List>
      {liked.likedBooks.map((book) => (
        <ListItem
          key={book.book_id}
          secondaryAction={
            <IconButton edge="end" onClick={() => liked.removeBook(book.book_id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      ))}
    </List>
  );
}
