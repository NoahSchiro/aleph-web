const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function searchBooks(query) {
  const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  return res.json();
}

export async function getRecommendations(bookIds, topK = 100) {
  const res = await fetch(`${API_BASE_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      book_ids: bookIds,
      ratings: bookIds.map(() => 5), // every liked book treated as 5-star
      top_k: topK,
    }),
  });
  if (!res.ok) throw new Error(`Recommend failed (${res.status})`);
  return res.json();
}
