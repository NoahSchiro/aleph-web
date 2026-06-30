import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Tabs, Tab, Container } from "@mui/material";
import SearchTab from "./components/SearchTab";
import MyBooksTab from "./components/MyBooksTab";
import RecommendationsTab from "./components/RecommendationsTab";
import { useLikedBooks } from "./hooks/useLikedBooks";

function NavTabs() {
  const TABS = [
    { label: "Search", path: "/" },
    { label: "My Books", path: "/my-books" },
    { label: "Recommendations", path: "/recommendations" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = TABS.findIndex((t) => t.path === location.pathname);

  return (
    <Tabs value={currentIndex === -1 ? 0 : currentIndex} onChange={(_, idx) => navigate(TABS[idx].path)}>
      {TABS.map((t) => (
        <Tab key={t.path} label={t.label} />
      ))}
    </Tabs>
  );
}

export default function App() {
  const liked = useLikedBooks();

  return (
    <BrowserRouter>
      <AppBar position="static" color="default" sx={{ alignItems: "center" }}>
        <NavTabs />
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<SearchTab liked={liked} />} />
          <Route path="/my-books" element={<MyBooksTab liked={liked} />} />
          <Route path="/recommendations" element={<RecommendationsTab liked={liked} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
