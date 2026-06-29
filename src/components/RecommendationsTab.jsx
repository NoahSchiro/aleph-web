import { useState, useRef, useCallback, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { getRecommendations } from "../api";
import Disclaimer from "./Disclaimer";

const PAGE_SIZE = 20;

export default function RecommendationsTab({ liked }) {
  const [recommendations, setRecommendations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);

  async function handleGetRecommendations() {
    if (liked.likedBooks.length === 0) {
      setError("Add some books to My Books first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const bookIds = liked.likedBooks.map((b) => b.book_id);
      const data = await getRecommendations(bookIds, 100);
      setRecommendations(data);
      setVisibleCount(PAGE_SIZE);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, recommendations.length));
  }, [recommendations.length]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const visible = recommendations.slice(0, visibleCount);

  return (
    <Stack spacing={2}>
      <Disclaimer />
      <Button variant="contained" onClick={handleGetRecommendations} disabled={loading}>
        Get Recommendations
      </Button>

      {loading && <CircularProgress size={24} />}
      {error && <Alert severity="error">{error}</Alert>}

      <List>
        {visible.map((book, i) => {
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
              <ListItemAvatar>
                <Avatar>{i + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={book.title} secondary={book.author} />
            </ListItem>
          );
        })}
      </List>

      {visibleCount < recommendations.length && <div ref={sentinelRef} />}
    </Stack>
  );
}
