import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "likedBooks";

export function useLikedBooks() {
  const [likedBooks, setLikedBooks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedBooks));
  }, [likedBooks]);

  const addBook = useCallback((book) => {
    setLikedBooks((prev) => {
      if (prev.some((b) => b.book_id === book.book_id)) return prev;
      return [...prev, book];
    });
  }, []);

  const removeBook = useCallback((bookId) => {
    setLikedBooks((prev) => prev.filter((b) => b.book_id !== bookId));
  }, []);

  const isLiked = useCallback(
    (bookId) => likedBooks.some((b) => b.book_id === bookId),
    [likedBooks]
  );

  return { likedBooks, addBook, removeBook, isLiked };
}
